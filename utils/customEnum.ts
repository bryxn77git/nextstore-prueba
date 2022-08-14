import { Category } from "../models";

export const customEnum = async (v: any, type: any) => {
    return !!await Category.findOne({ typeOf: type, deleted: false, value: v });
}