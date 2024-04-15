import Job from '../../model/jobModel/job.model.js'
async function createJob(req,res){ 
console.log('create job');
try {
    const {companyName,title,description,jobType,logoUrl,duration,salary,location,locationType,aboutcompany,about,skills}=req.body;
    const refUserId=req.id;
    console.log(refUserId);
    console.log(companyName,title,description,jobType,logoUrl,duration,salary,location,locationType,aboutcompany,about,skills);
    if(!companyName||!title||!description||!logoUrl||!salary||!duration||!location||!jobType||!about||!locationType||!skills||!aboutcompany||!refUserId){
        return res.status(400).json({
            success:false,
            message:'job create failed',
            data:'All feild are required'
        })
    }
    const data=await Job.create({
        companyName,title,description,logoUrl,salary,location,locationType,skills,refUserId,jobType,about,duration,aboutcompany

    });
    (await data).save
    return res.status(200).json({
        success:true,
        message:'job create successs',
        data:data
    })
    
} catch (error) {
    console.log(error);

    return res.status(500).json({
        success:false,
        message:'job create failed',
        data:error.message
    })
}
}
async function updateJob(req,res){ 
console.log('update job');
try {
    const UserId=req.params.jobId;
    const {companyName,title,description,logoUrl,salary,location,duration,locationType,skills}=req.body;
    const refUserId=req.id;
    console.log(UserId);
    console.log(companyName);
    console.log(refUserId);

    // if(!companyName||!title||!description||!logoUrl||!salary||!location||!duration||!locationType||!skills){
    //     return res.status(400).json({
    //         success:false,
    //         message:'job create failed',
    //         data:'All feild are required'
    //     })
    // }
    const data=await Job.updateOne({_id:UserId,refUserId:refUserId},
        {
            $set:{
                companyName,title,description,logoUrl,salary,location,duration,locationType,skills
            }
        })
        const job=await Job.findOne({_id:UserId})

    console.log(data);
    console.log(job);
    return res.status(200).json({
        success:true,
        message:'job update successs',
        data:job
    })
    
} catch (error) {
    console.log(error);

    return res.status(500).json({
        success:false,
        message:'job update failed',
        data:error.message
    })
}
}
async function getJob(req,res,next){
    console.log('get job');
    console.log(req.params.jobId);
    try {   
        const UserId=req.params.jobId;
        if(!UserId){
            return res.status(400).json({
                success:false,
                message:'job get failed',
                data:'not valid job '
            })
        }
        const job=await Job.findById(UserId)
        if(!job){
            return res.status(400).json({
                success:false,
                message:'job get failed',
                data:'job not found'
            }) 
        }
        return res.status(200).json({
            success:true,
            message:'job get successs',
            data:job
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'job get failed',
            data:error.message
        })
    }
}
async function getJobsAll(req,res,next){
    console.log('get all jobfas');
    try {
        const data=req.query.data||''
        const title=req.query.title||'';
        const companyName=req.query.companyName||'';
        const description=req.query.description||'';
        const salary=req.query.salary||'';
        const location=req.query.location||'';
        const duration=req.query.duration||'';
        const locationType=req.query.duration||'';
        const skills=req.query.skills;
        let filteredSkills;
        let filter={};
        if(skills){
            filteredSkills=skills.split(",")
            filteredSkills=filteredSkills.map(element=>{
                return new RegExp(element,"i")
            })
            filter={skills:{$in:filteredSkills}}
            // skils=skills.split(',');
            // skill={skills:{$in:skils}}

            
        }
        if(data){
        const job=await Job.find({})
        if(!job){
            return res.status(400).json({
                success:false,
                message:'job get failed',
                data:'job not found'
            }) 
        }
        return res.status(200).json({
            success:true,
            message:'job get successs',
            data:job
        })

        }
        // const job=await Job.find({title:{$regex:title,$options:'i'},...filter});
        // const job=await Job.find({skills:{$in:skills}});
        // const job=await Job.find({title:{$regex:title,$options:'i'},companyName:{$regex:companyName,$options:'i'}});
        // const job=await Job.find({title:{$regex:title,$options:'i'},companyName:{$regex:companyName,$options:'i'},description:{$regex:description,$options:'i'},salary:{$regex:salary,$options:'i'},location:{$regex:location,$options:'i'},duration:{$regex:duration,$options:'i'},locationType:{$regex:locationType,$options:'i'}})   ;
        const job=await Job.find({title:{$regex:title,$options:'i'},companyName:{$regex:companyName,$options:'i'},description:{$regex:description,$options:'i'},salary:{$regex:salary,$options:'i'},location:{$regex:location,$options:'i'},duration:{$regex:duration,$options:'i'},locationType:{$regex:locationType,$options:'i'},...filter});
        // console.log(title,companyName,salary,description,skills,duration,location,locationType);
        if(!job){
            return res.status(400).json({
                success:false,
                message:'job get failed',
                data:'job not found'
            }) 
        }
        return res.status(200).json({
            success:true,
            message:'job get successs',
            data:job
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'job get failed',
            data:error.message
        })
    }
}
async function getJobSearch(req,res,next){
    console.log('get job search');
    try {
        const data=req.query.data.trim()||'';
        console.log(data);
        // let filteredSkills;
        // let filter={};
        // if(skills){
        //     filteredSkills=skills.split(",")
        //     filteredSkills=filteredSkills.map(element=>{
        //         return new RegExp(element,"i")
        //     })
        //     filter={skills:{$in:filteredSkills}}
            // skils=skills.split(',');
            // skill={skills:{$in:skils}}

            
        // }
        
        const title=await Job.find({title:{$regex:data,$options:'i'}});
        const salary=await Job.find({salary:{$regex:data,$options:'i'}});
        const companyName=await Job.find({companyName:{$regex:data,$options:'i'}});
        const description=await Job.find({description:{$regex:data,$options:'i'}});
        const location=await Job.find({location:{$regex:data,$options:'i'}});
        const duration=await Job.find({duration:{$regex:data,$options:'i'}});
        const locationType=await Job.find({locationType:{$regex:data,$options:'i'}});
        const skills=await Job.find({skills:{$in:new RegExp(data,"i")}})
        // console.log(title);
        // console.log(description);
        // console.log(location);
        // console.log(companyName);
        // console.log(duration);
        // console.log(locationType);
        // console.log(salary);
        // console.log(skills);
        
        let dataa=[];
        if(title.length){
            dataa=[...title,...dataa]
        }
        if(description.length){
            dataa=[...description,...dataa]
        }
        if(location.length){
            dataa=[...location,...dataa]
        }
        if(companyName.length){
            dataa=[...companyName,...dataa]
        }
        if(duration.length){
            dataa=[...duration,...dataa]
        }
        if(locationType.length){
            dataa=[...locationType,...dataa]
        }
        if(salary.length){
            dataa=[...salary,...dataa]
        }
        if(skills.length){
            dataa=[...skills,...dataa]
        }
       
        // const job=await Job.find({title:{$regex:data,$options:'i'},companyName:{$regex:data,$options:'i'},description:{$regex:data,$options:'i'},salary:{$regex:data,$options:'i'},location:{$regex:data,$options:'i'},duration:{$regex:data,$options:'i'},locationType:{$regex:data,$options:'i'}});
        if(!dataa){
            return res.status(400).json({
                success:false,
                message:'job get failed',
                data:'job not found'
            }) 
        }
        // console.log(job);
        return res.status(200).json({
            success:true,
            message:'job get successs',
            data:dataa
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'job get failed',
            data:error.message
        })
    }
}
export {createJob,getJob,getJobsAll,updateJob,getJobSearch}