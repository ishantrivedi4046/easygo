import { forEach } from "lodash";

export const sanitizeObject = (root: any) => {
  const childs = Object.keys(root);
  if (childs.length === 0) return {};
  let sanitizedRoot: any = {};
  let newRoot: any = {};
  forEach(childs, (child) => {
    const value = root[child];
    if (!Array.isArray(value) && typeof value === "object") {
      newRoot = {
        ...newRoot,
        [child]: sanitizeObject(value),
      };
    } else {
      newRoot = {
        ...newRoot,
        [child]: value,
      };
    }
  });
  forEach(childs, (child) => {
    const value = newRoot[child];
    if (
      (typeof value === "string" && value !== "") ||
      (Array.isArray(value) && value.length > 0) ||
      (typeof value === "object" && Object.keys(value).length > 0)
    ) {
      sanitizedRoot = {
        ...sanitizedRoot,
        [child]: value,
      };
    }
  });
  return sanitizedRoot;
};
