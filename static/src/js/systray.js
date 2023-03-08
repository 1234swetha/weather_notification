/** @odoo-module **/


import { Dropdown } from "@web/core/dropdown/dropdown";
import { registry } from "@web/core/registry";

import { Component } from "@odoo/owl";

let lon;
let lat;
var datetimes;
var today_date;
let temperature = $(".temp");
let summary = $(".summary");
let main_summary = $(".main_summary");
let loc = $(".location");
let icon = $(".icon");
const kelvin = 273;

export class WeatherNotification extends Component {
    setup() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                lon = position.coords.longitude;
                lat = position.coords.latitude;
                 const monthNames = ["January", "February", "March", "April", "May", "June",
                              "July", "August", "September", "October", "November", "December"];
                const api =" "; //api id
                const base =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
                             `lon=${lon}&appid= `;
                console.log(base);
                fetch(base)
                   .then((response) => {
                    return response.json();
                })
                   .then((data) => {
                    var currentdate = new Date();
                    today_date = currentdate.getDate() + "  "
                            + monthNames[(currentdate.getMonth())]  + "  "
                            + currentdate.getFullYear() + "  "
                    datetimes = currentdate.getDate() + "/"
                            + (currentdate.getMonth()+1)  + "/"
                            + currentdate.getFullYear() + "  "
                            + currentdate.getHours() + ":"
                            + currentdate.getMinutes() + ":"
                            + currentdate.getSeconds();
                    temperature = Math.floor(data.main.temp - kelvin) + "°C";
                    main_summary = data.weather[0].main;
                    summary = data.weather[0].description;
                    loc = data.name + "," + data.sys.country;
        });
    });
  }
    }
    get weather() {
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                lon = position.coords.longitude;
                lat = position.coords.latitude;
                const monthNames = ["January", "February", "March", "April", "May", "June",
                              "July", "August", "September", "October", "November", "December"];
                const api ="2297bf7470b68dfb297a03e24a8be23f";
                const base =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
                             `lon=${lon}&appid=2297bf7470b68dfb297a03e24a8be23f`;
                fetch(base)
                   .then((response) => {
                    return response.json();
                })
                   .then((data) => {
                    var currentdate = new Date();
                    var today_date = currentdate.getDate() + "  "
                            + monthNames[(currentdate.getMonth())]  + "  "
                            + currentdate.getFullYear() + "  "
                    var datetimes = currentdate.getDate() + "/"
                            + (currentdate.getMonth()+1)  + "/"
                            + currentdate.getFullYear() + "  "
                            + currentdate.getHours() + ":"
                            + currentdate.getMinutes() + ":"
                            + currentdate.getSeconds();
                    temperature = Math.floor(data.main.temp - kelvin) + "°C";
                    main_summary = data.weather[0].main;
                    summary = data.weather[0].description;
                    loc = data.name + "," + data.sys.country;
                    console.log(monthNames[(currentdate.getMonth())])
        });
    });
    }
        var dict = {
            temp: temperature,
            sum:summary,
            details:main_summary,
            today:today_date,
            last_sync:datetimes,
            location:loc
        };
        return dict;
    }
  }

WeatherNotification.template = "WeatherNotification";
WeatherNotification.components = { Dropdown };


export const systrayItem = {
    Component: WeatherNotification,
};
registry.category("systray").add("WeatherNotification", systrayItem, { sequence: 30 });

