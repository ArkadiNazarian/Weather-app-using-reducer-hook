import { FormikErrors } from 'formik';

export interface Iprops{
    weather_part:IModel,
    action_submit:()=>void,
    form_data:IFormValues,
    form_errors:FormikErrors<IFormValues>,
    handleChange:(e:any)=>void
}

export interface IModel {
    loading:boolean,
    weather:Array<IWeatherModel>,
    error:string;
    main:{
        humidity:number,
        temp:number,
        temp_max:number,
        temp_min:number
    }
}

export interface IFormValues{
    city_name:string;
}

export interface IWeatherModel{
    description:string;
}