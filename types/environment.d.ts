declare global {
	namespace NodeJS {
	  interface ProcessEnv {
		NODE_ENV: 'development' | 'production';
		PORT?: number;
		PWD: string;
		MP_ACCESS_TOKEN: string;
	  }
	}
}

export {}