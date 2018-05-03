const Plan = require('models/plan');
const { ObjectId } = require('mongoose').Types;

exports.save = async(ctx) => {
    const {
        username,
        title,
        arriveDate,
        departDate,
        numberOfDays,
        selectedDateArray
    } = ctx.request.body;

    const plan = new Plan({
        username,
        title,
        arriveDate,
        departDate,
        numberOfDays,
        selectedDateArray
    });

    try {
        await plan.save();
        ctx.status = 200;
        ctx.body = {
            success: true
        }
    } catch (e) {
        ctx.throw(500, e);
    }

}

exports.getPlanLists = async(ctx) => {

    const number = parseInt(ctx.query.number || 1, 10);

    if (number < 1) {
        ctx.status = 400;
        return;
    }

    const {username} = ctx.query;

    try {
        const plans = await Plan
            .find({username: username})
            .sort({_id: -1})
            .limit()
            .skip((number - 1) * 10)
            .lean()
            .exec();
        const planCount = await Plan
            .count()
            .exec();
        ctx.body = plans;
    } catch (e) {
        ctx.throw(500, e);
    }

    // ctx.status = 200; ctx.body = {     plans };
}

exports.updateDetailPlan = async(ctx) => {
    const {id, nod} = ctx.query;
    try {
        const existingPlan = await Plan
            .findById(id)
            .exec();

        let existingDetailPlan = existingPlan.detailPlan;
        const plan = await Plan.findByIdAndUpdate(id, {
            $push: {
                detailPlan: ctx.request.body
            }
        },{new: true}).exec();
        ctx.body = plan;
        // if(existingDetailPlan.length === 0) {
        //     const plan = await Plan.findByIdAndUpdate(id, {
        //         $push: {
        //             detailPlan: ctx.request.body
        //         }
        //     }, {new: true}).exec();
        //     ctx.body = plan;
        // } else {
        //     existingDetailPlan = existingDetailPlan.filter(
        //         (plan) => {
        //             console.log(plan.numberOfDay);
        //             return plan.numberOfDay !== parseInt(nod, 10)
        //         }
        //     );
        //     existingDetailPlan.push(ctx.request.body);
        //     // console.log(existingDetailPlan.pull());
        //     const plan = await Plan.findByIdAndUpdate(id, {
        //         detailPlan: existingDetailPlan
        //     }, {new: true}).exec();

        //     ctx.body = plan;
        // }

    } catch (e) {
        ctx.throw(500, e);
    }
}

exports.getDetailPlanList = async(ctx) => {
    const {nod} = ctx.query;
    const { id } = ctx.params;

    try {
        const detailPlans = await Plan
            .findById(id)
            .exec();
        const detailPlanByNod = detailPlans.detailPlan.filter(
            (plan) => {
                return plan.numberOfDay === parseInt(nod, 10);
            }
        )
        ctx.body = detailPlanByNod;
    } catch (e) {
        ctx.throw(500, e);
    }
}