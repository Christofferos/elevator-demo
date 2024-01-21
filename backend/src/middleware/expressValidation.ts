import { Request, Response, NextFunction } from "express";
import { validationResult, check } from "express-validator";

export const validateInputs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationRules = [
    check("currentFloor")
      .notEmpty()
      .withMessage("currentFloor body param cannot be empty")
      .isInt({ min: 0, max: 19 })
      .withMessage("currentFloor param must be an integer between 0 and 19"),
  ];

  // Sanitize the input params that can be used as HTML or in URLS to ensure it is safe: sanitize("elevatorId").escape()

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  });
};
