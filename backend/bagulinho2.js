import { supabase } from "./Controlador/supabase.mjs";

/**
 * const { data, error } = await supabase.storage.updateBucket("produtos", {
  public: true,
  allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"],
  fileSizeLimit: 1024 * 1024 * 10,
});
 */

//const { data, error } = await supabase.storage.listBuckets();

const { data, error } = await supabase.storage.from("produtos").list("imagens");

console.log(data, error);

