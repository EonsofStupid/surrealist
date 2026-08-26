fn main() {
    tauri_build::build();

    if std::env::var("VITE_CONNECTOME_PREVIEW").is_err() {
        println!("cargo:rustc-env=VITE_CONNECTOME_PREVIEW=false");
    }
}
