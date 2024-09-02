/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'text': {
          light: '#024932',
        },
        'title': {
          light: '#09855E'
        },
        'orgnizerbg': {
          light: '#ECF3FA'
        },
        'offerbg': {
          light: '#E0E8E5'
        },
        'chatbg':{
          light:'#bcbcbc'
        },
        'add-button': {
          light: '#359C88'
        },
        'change-button': {
          light: '#EE9C3D'
        },
        'delete-button': {
          light: '#E44B37'
        },
        'error': {
          light: '#F81010'
        },
        'bar-color':{
          light:'#2F323A'
        },
        'back':{
          light:'#291720'
        },
        'status':{
          light:'#170B11'
        },
        'border':{
         // light:'#C837A4'
         light:'#DE69E6'
        }
      },
      'drop-shadow-md': {
        filter: 'drop-shadow(0 4px 3px rgb(125,143,154/ 0.07)) drop-shadow(0 2px 2px rgb(125,143,154 / 0.06))'
      },
      'serif': ['Georgia'],
      'body': ['"Open Sans"'],
    },
    fontFamily: {
      'pthin': ['Poppins-Thin','sans-serif', ],
      'pextralight': ['Poppins-ExtraLight','sans-serif', ],
      'plight': ['Poppins-Light','sans-serif', ],
      'pregular': ['Poppins-Regular','sans-serif', ],
      'pmedium': ['Poppins-Medium','sans-serif', ],
      'psemibold': ['Poppins-SemiBold','sans-serif', ],
      'pbold': ['Poppins-Bold','sans-serif', ],
      'pblack': ['Poppins-Black','sans-serif', ],
      'pextrabold': ['Poppins-ExtraBold','sans-serif', ],
    },
 


  },
  plugins: [],
}

