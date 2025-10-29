export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.CKpjgjA5.js",app:"_app/immutable/entry/app.DwBoH3yh.js",imports:["_app/immutable/entry/start.CKpjgjA5.js","_app/immutable/chunks/DiSjRpaj.js","_app/immutable/chunks/CpKiMDMZ.js","_app/immutable/chunks/DT2_Hpur.js","_app/immutable/chunks/s_93w603.js","_app/immutable/entry/app.DwBoH3yh.js","_app/immutable/chunks/Dp1pzeXC.js","_app/immutable/chunks/CpKiMDMZ.js","_app/immutable/chunks/1VraXD8o.js","_app/immutable/chunks/Dkvx9RK0.js","_app/immutable/chunks/s_93w603.js","_app/immutable/chunks/BKS4yaa3.js","_app/immutable/chunks/DT2_Hpur.js","_app/immutable/chunks/FNp6gcVa.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/calendario",
				pattern: /^\/calendario\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/historico",
				pattern: /^\/historico\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/referencias",
				pattern: /^\/referencias\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
