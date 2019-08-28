const _ = require('lodash')
const bcrypt = require('bcrypt')
import {Workout} from '../models/workoutModel'
import { workoutValidation } from '../validators/workoutValidation';

export const addNewWorkout = async (req, res) => {

    const {error} = workoutValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let workout = await Workout.findOne({name: req.body.name})
    if(workout) return res.status(400).send('workoutname taken')
    
    workout = new Workout(_.pick(req.body, ['name', 'keywords', 'setCards', 'user_id']))
    await workout.save()

    res.send(_.pick(workout, ['_id', 'name', 'keywords', 'setCards', 'user_id']))
}

export const getWorkouts = (req, res) => {
    Workout.find({}, (err, workout) => {
        if (err) {
            res.send(err)
        }
        res.json(workout)
    })
}

export const getWorkoutWithID = (req, res) => {
    Workout.findById(req.params.workoutId, (err, workout) => {
        if (err) {
            res.send(err)
        }
        res.json(workout)
    })
}

export const updateWorkout = (req, res) => {
    Workout.findOneAndUpdate({ _id: req.params.workoutId}, req.body, { new: true }, (err, workout) => {
        if (err) {
            res.send(err)
        }
        res.json(workout)
    })
}

export const deleteWorkout = (req, res) => {
    Workout.remove({ _id: req.params.workoutId }, (err, workout) => {
        if (err) {
            res.send(err)
        }
        res.json({message: 'Successfully deleted workout'})
    })
}