import Vue from 'vue'

Vue.filter('filterDataTime', value => {
  const date = new Date(value).toLocaleDateString();
  const time = new Date(value).toLocaleTimeString().slice(0, 5);
  return ` published at ${date} in ${time} `;
})
Vue.filter('exectText', value => {
 return value ?  value.slice(0, 150) : value
})

Vue.filter('filterName', value => {
  return value.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')
})

