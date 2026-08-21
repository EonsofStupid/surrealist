/// <reference types="vite/client" />

interface ImportMetaEnv {
	DATE: string;
	VERSION: string;
	RRFLOW_VERSION: string;
	MODE: string;
	GTM_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
