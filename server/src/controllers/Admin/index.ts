import express, { Request, Response, Router } from "express";
import adminModel from "../../models/Admin/Admin";

const router: Router = express.Router();

// get all admin
router.get(
  "/getalladmin",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const admin = await adminModel.find();
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
);

//get by id
router.get(
  "/getbyid/:id",
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const admin = await adminModel.findById(req.params.id);
      if (!admin) {
        res.status(404).json({ message: "Admin not found." });
        return;
      }
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
);

// delete all
router.delete(
  "/deleteall",
  async (req: Request, res: Response): Promise<void> => {
    try {
      await adminModel.deleteMany();
      res.status(200).json({ message: "All admin deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
);

// delete by id
router.delete(
  "deletebyid/:id",
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const admin = await adminModel.findByIdAndDelete(req.params.id);
      if (!admin) {
        res.status(404).json({ message: "Admin not found" });
        return;
      }
      res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
);

// edit by id 
router.put("/editbyid/:id",async(req:Request<{id:string}>,res:Response): Promise<void> => {
    try {
        const updatedAdmin = await adminModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedAdmin){
            res.status(404).json({ message: "Admin not found" });
            return;
        }
        res.status(200).json(updatedAdmin)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
})

export default router;