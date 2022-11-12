import axios from "axios"
import { IFormValues, Iprops, IWeatherModel } from "./model";
import * as yup from "yup";
import { useFormik } from "formik";
import { useReducer } from "react";

export const Container = (): Iprops => {

    const initialState = {
        loading: true,
        error: '',
        weather: [],
        main:{}
    }

    const reducer = (state: any, action: any) => {
        switch (action.type) {
            case 'FETCH_SUCCESS':
                return {
                    loading: false,
                    weather: action.weather_payload,
                    main:action.temp_payload,
                    error: ""
                }
            case 'FETCH_FAILED':
                return {
                    loading: true,
                    weather: [],
                    main:{},
                    error: "error"
                }
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const initial_values: IFormValues = {
        city_name: ""
    };

    const validation_schema = yup.object().shape({
        city_name: yup.string().required()
    });

    const action_submit = (values: IFormValues) => {
        axios({
            method: "Get",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${values.city_name}&appid=78b2c4f87795f7412b34d82444ab55dc`,
            responseType: "json"
        })
            .then((response) => {
                dispatch({
                    type: "FETCH_SUCCESS",
                    weather_payload: response.data.weather,
                    temp_payload:response.data.main
                })
            })
            .catch(() => {
                dispatch({ type: "FETCH_FAILED" })
            })
    }

    const formik = useFormik({
        initialValues: initial_values,
        validationSchema: validation_schema,
        onSubmit: action_submit,
    });

console.log(state?.main)

    return {
        weather_part: state!,
        action_submit: formik.handleSubmit,
        form_data: formik.values,
        form_errors: formik.errors,
        handleChange: formik.handleChange
    }
}