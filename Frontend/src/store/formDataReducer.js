
if(typeof(window)!='undefined'){
  if(localStorage.getItem('USerInfo')!=null){
    var userdata=JSON.parse(localStorage.getItem('USerInfo'))
  }
  else{
    var userdata={}
  }
}
var initialVal = {
  dataList: [],
  dataObj: {},
  userInfo: userdata
}

export default function FormDataRaducer(state = initialVal, action) {
  switch (action.type) {
    case "Add_Data":
      state = { dataList: [...state.dataList, action.payload] }
      return (state);
    case "Delete_Data":
      state = { dataList: state.dataList.filter(item => item != action.payload) }
      return (state);
    case "View_Data":
      state = { dataObj: action.payload, dataList: state.dataList }
      return (state);
    case "Edit_Data":
      state = { dataList: action.payload }
      return (state);
    case "USerInfo":
      state = { userInfo: action.payload }
      return (state);
    default:
      return state;
  }
}