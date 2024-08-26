import React, {useState, useEffect, useMemo} from "react";
import { useForm } from "react-hook-form";
import { defaultFormData } from '../../models/defaultFormData ';
import Input from "../../Input";
import Button from "../../Button/Button";
import classes from './Form.module.css';
import axios from 'axios';

export default function Form() {
   const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    mode: 'onChnage',
    defaultValues: defaultFormData,
   })

  const [isDataSent, setIsDataSent] = useState(false)

  useEffect(() => {
    let timer;
    if (isDataSent) {
      timer = setTimeout(() => {
        setIsDataSent(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isDataSent])

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('.')
    return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`
  }

  const isValidDate = (dateString) => {
    const regex = /^\d{1,2}\.\d{1,2}\.\d{4}$/
    if (!regex.test(dateString)) return false
  
    const [day, month, year] = dateString.split('.').map(Number)
    const date = new Date(year, month - 1, day)
  
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    )
  }

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      birthDate: formatDate(data.birthDate),
    }

    try {
      const response = await axios.post('http://localhost:5000/save-client', formattedData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })

      console.log(response.data.msg)
      reset();
      setIsDataSent(true)
    } catch (error) {
      console.error('Client data was not sent', error)
      setIsDataSent(false)
    }
  }

  return (
    <div className={classes.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Enter your personal information</h3>
        <div className={classes['input-group']}>
          <div className={classes['input-wrapper']}>
            <Input
              label="Name"
              type="text"
              {...register("firstName", { required: "Enter your name" })}
              style={{
                border: errors.firstName ? "1px solid red" : null,
              }}
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className={classes['error-message']}>{errors.firstName.message}</p>}
          </div>

          <div className={classes['input-wrapper']}>
            <Input
              label="Last Name"
              type="text"
              {...register("lastName", { required: "Enter your last name" })}
              style={{
                border: errors.lastName ? "1px solid red" : null,
              }}
              placeholder="Enter your last name"
            />
            {errors.lastName && <p className={classes['error-message']}>{errors.lastName.message}</p>}
          </div>

          <div className={classes['input-wrapper']}>
            <Input
              label="Birthday"
              type="text"
              {...register("birthDate", {
                required: "Enter your birth date",
                validate: value => isValidDate(value) || "Invalid date format"
              })}
              style={{
                border: errors.birthDate ? "1px solid red" : null,
              }}
              placeholder="dd.mm.yyyy"
            />
            {errors.birthDate && <p className={classes['error-message']}>{errors.birthDate.message}</p>}
          </div>

          <div className={classes['radio-group-wrapper']}>
            <div className={classes['radio-group']} style={{ 
              border: errors.sex ? "1px solid red" : null,
            }}>
              <label>
                <Input
                  label="Male"
                  type="radio"
                  value="male"
                  {...register("sex", { required: "Please select a gender" })}
                />
              </label>
              <label>
                <Input
                  label="Female"
                  type="radio"
                  value="female"
                  {...register("sex", { required: "Please select a gender" })}
                />
              </label>
            </div>
            {errors.sex && <p className={classes['error-message']}>{errors.sex.message}</p>}
          </div>
        </div>
        <Button type="submit" isActive={isValid}>Submit</Button>
        {isDataSent && (
          <p className={classes['success-message']}>Your data was successfully saved</p>
        )}
      </form>
    </div>
  )
}