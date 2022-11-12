import { Iprops } from "./model"

export const View = (props: Iprops) => {
   console.log(props.weather_part.main)
   return (
      <div>
         <div>
            <form onSubmit={props.action_submit}>
               <input
                  name="city_name"
                  type="text"
                  value={props.form_data.city_name}
                  onChange={props.handleChange}
               />
               <div>
                  <button type="submit" >submit</button>
               </div>
            </form>
         </div>
         {
            props.weather_part.weather.length >0 ?
            props.weather_part.weather.map((value)=>value.description): null
         }
         {
            props.weather_part.main?.temp_min
         }
      </div>
   )
}