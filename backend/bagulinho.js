import { supabaseAdmin } from "./Controlador/supabase.mjs";
import multer from "multer";
import fs from "fs";
import path from "path";

/**
 * const {data, error} = await supabase.storage.createBucket('produtos', {
public: true,
allowedMimeTypes: ['image/png'],
fileSizeLimit: 1024
})
*/

//const {data, error} = await supabase.storage.listBuckets()

/**
 * const { data, error } = await supabase.storage
.from("produtos")
.upload(`public/${file.name}`, file, {
    cacheControl: "3600",
    upsert: false,
  });
  
  console.log(data, error)
  */

async function Dados() {

try {

/**
 *     const caminhoDaImagemLocal = "public/imagens/1778764609265-18.png"; // Substitua pelo caminho real da sua imagem local

    if (!caminhoDaImagemLocal) {
        console.error("Caminho da imagem local não fornecido.");
        return;
    }

    const buffer = fs.readFileSync(path.resolve(caminhoDaImagemLocal));

    console.log("Buffer da imagem:", buffer);

    const { data, error } = await supabase.storage
        .from("produtos")
        .upload(`imagens/1778764609265-18.png`, buffer, {
            contentType: "image/png",
            cacheControl: "3600",
            upsert: true,
        });

    if (error) {
        console.error("Erro ao fazer upload da imagem para o Supabase Storage:", error);
    }

    console.log("Upload bem-sucedido:", data);

    const {data: urlData, error: urlError} = await supabase.storage
        .from("produtos")
        .getPublicUrl(`imagens/1778764609265-18.png`);

    if (urlError) {
        console.error("Erro ao obter a URL pública da imagem:", urlError);
    }
        console.log("URL pública da imagem:", urlData.publicUrl);
    
    const urlPublicaDaImagem = urlData.publicUrl;

    console.log("URL pública da imagem:", urlPublicaDaImagem);

 */

    /**
     * const { data: updateData, error: updateError } = await supabase.from("produtos")
        .update({ imagem:  'http://127.0.0.1:54321/storage/v1/object/public/produtos/imagens/1778764609265-18.png'})
        .eq("id", 58)
        .select()
        .single();

    if (updateError) {
        console.error("Erro ao atualizar o produto com a URL da imagem:", updateError);
    } else {
        console.log("Produto atualizado com sucesso:", updateData);
    }
     */

    const { data: updateData, error: updateError } = await supabaseAdmin.auth.admin.deleteUser('09e0727b-899b-45ad-845c-eaeb7478a4e4');

    if (updateError) {
        console.error("Erro ao excluir o usuário:", updateError);
    } else {
        console.log("Usuário excluído com sucesso:", updateData);
    }
   
} catch (error) {
    console.error("Erro ao ler a imagem local:", error);
}

}

Dados();

