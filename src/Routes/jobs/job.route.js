import {createJob,getJob,getJobsAll,updateJob,getJobSearch} from '../../controller/jobController/job.controller.js'
import { Router } from 'express'
import auth from '../../middleware/auth.js'
const route=Router()
route.post('/createJob',auth,createJob)
route.post('/updateJob/:jobId',auth,updateJob)
route.get('/getJob/:jobId',getJob)
route.get('/getJobsAll',getJobsAll)
route.get('/getJobSearch',getJobSearch)
export default route