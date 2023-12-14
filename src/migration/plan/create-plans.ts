import Plan, { PlanDTO } from "../../models/plan";
var plans : PlanDTO[] = require('./data.json');

plans.forEach(plan => {
	Plan.create(plan)
		.then(_plan => {
			console.log(`[+] Plan ${_plan.name} has been created.`);
		})
		.catch(e => { console.log('ERROR:' + e.message)})
});