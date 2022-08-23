import { isEmpty } from "class-validator";
import { Router, Response, Request, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import Sub from "../entities/Sub";
import Post from "../entities/Post";
import { User } from "../entities/User";
import userMiddleWare from '../middlewares/user';
import authMiddleWare from '../middlewares/auth';
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { makeId } from "../utils/helpers";
import { unlinkSync } from "fs";

const createSub = async (req: Request, res: Response, next) => {
  const {name, title, description } = req.body;

  try {
    let errors: any = {};
    if(isEmpty(name)) errors.name = "Name cannot be blanked"
    if(isEmpty(title)) errors.title = "Title cannot be blanked"

    const sub = await AppDataSource.
    getRepository(Sub)
    .createQueryBuilder("sub")
    .where("lower(sub.name) = :name", { name: name.toLowerCase() })
    .getOne();

    if(sub) errors.name = "This Sub is already existed"
    if (Object.keys(errors).length > 0) {
      throw errors;
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Issue came out"})
  } 

  try {
    const user: User = res.locals.user;

    const sub = new Sub();
    sub.name = name;
    sub.description = description;
    sub.title = title;
    sub.user = user;

    await sub.save();
    return res.json(sub);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Issue came out "})
  }

}

const topSubs = async (_: Request, res: Response) => {
  try {
    const imageUrlExp = `COALESCE('${process.env.APP_URL}/images/' || s."imageUrn", 'https://www.gravatar.com/avatar?d=mp&f=y')`;
    const subs = await AppDataSource
    .createQueryBuilder()
    .select(`s.title, s.name, ${imageUrlExp} as "imageUrl", count(p.id) as "postCount"`)
    .from(Sub, "s")
    .leftJoin(Post, "p", `s.name = p."subName"`)
    .groupBy('s.title, s.name, "imageUrl"')
    .orderBy(`"postCount"`, "DESC")
    .limit(5)
    .execute();
  return res.json(subs)
  } catch( error ) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong "})
  }
}

const getSub = async (req: Request, res: Response) => {
  const name = req.params.name;
  try {
    const sub = await Sub.findOneByOrFail({ name });

    // put post info that belongs to that sub
    const posts = await Post.find({
      where: {subName: sub.name},
      order: { createdAt: "DESC"},
      relations: ["comments", "votes"]
    })

    sub.posts = posts;

    if(res.locals.user) {
      sub.posts.forEach((p) => p.setUserVote(res.locals.user))
    }

    console.log('sub', sub)

    return res.json(sub)
  } catch(error) {
    return res.status(404).json({ error: "Cannot find any communities."})
  }
}

const ownSub = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  try {
    const sub = await Sub.findOneOrFail({ where: {name: req.params.name }})
    if (sub.username !== user.username) {
      return res.status(403).json({ error: "You don't have an authorization"})
    }

    res.locals.sub = sub;
    next();
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Something went wrong" })
  }
}

const upload = multer({
  storage:multer.diskStorage({
    destination: "public/images",
    filename: (_, file, callback) => {
      const name = makeId(10);
      callback(null, name + path.extname(file.originalname))
    },
  }),
  fileFilter: (_, file: any, callback: FileFilterCallback) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      callback(null, true);
    } else {
      callback(new Error("This is not an Image."))
    }
  }
})

const uploadSubImage = async (req: Request, res: Response) => {
  const sub: Sub = res.locals.sub;
  try {
    const type = req.body.type;
    // Delete file if it is not undefined type
    if (type !== "image" && type !== "banner") {
      if(!req.file?.path) {
        return res.status(400).json({error: "This isn't valid file"})
      }

    // remove file
    unlinkSync(req.file.path);
    return res.status(400).json({ error: "Wrong Type"})
  }

    let oldImageUrn: string = "";
    
    if(type === "image") {
      // Store Urn in order to delete prev file
      oldImageUrn = sub.imageUrn || "";
      // Put new file name as Urn
      sub.imageUrn = req.file?.filename || "";
    } else if (type === "banner") {
      oldImageUrn = sub.bannerUrn || "";
      sub.bannerUrn = req.file?.filename || "";
    }
    await sub.save();

    // Delete unused file
    if(oldImageUrn !== "") {
      const fullFilename = path.resolve (
        process.cwd(),
        "public",
        "images",
        oldImageUrn
      );
      unlinkSync(fullFilename)
    }

    return res.json(sub);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "There is a problem "})
  }
}

const router = Router()

router.get("/:name", userMiddleWare, getSub)
router.post("/", userMiddleWare, authMiddleWare, createSub);
router.get("/sub/topSubs", topSubs)
router.post(
    "/:name/upload", 
    userMiddleWare, 
    authMiddleWare, 
    ownSub, 
    upload.single("file"), 
    uploadSubImage
  )
export default router;