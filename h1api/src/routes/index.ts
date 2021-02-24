const requireDirectory = require('require-directory');
const v1api = requireDirectory(module, './v1');
const routes = [v1api];


const register = (server) => {
	const registerApi = (api) => {
		const keys = Object.keys(api);
		keys.forEach((key) => {
			server.route(api[key].default);
		});
	};

	
	routes.forEach((routeList) => {
		Object.keys(routeList).forEach((route) => {
			registerApi(routeList[route]);
		});
	});
};



export default {
	register
};