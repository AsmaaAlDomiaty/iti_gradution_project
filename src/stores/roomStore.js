import {defineStore} from "pinia";
import {ref} from "vue";
export const useRoomStore=defineStore("room",()=>{
 const rooms=ref(JSON.parse(localStorage.getItem("uniroom_rooms")||"[]"));
 const reports=ref(JSON.parse(localStorage.getItem("uniroom_reports")||"[]"));
 const save=()=>localStorage.setItem("uniroom_rooms",JSON.stringify(rooms.value));
 const saveReports=()=>localStorage.setItem("uniroom_reports",JSON.stringify(reports.value));
 function addRoom(room){rooms.value.push({...room,id:Date.now().toString()});save()}
 function updateRoom(id,data){const i=rooms.value.findIndex(x=>x.id===id);if(i>-1){rooms.value[i]={...rooms.value[i],...data};save()}}
 function deleteRoom(id){rooms.value=rooms.value.filter(x=>x.id!==id);save()}
 function addReport(report){reports.value.unshift({...report,id:Date.now().toString(),status:"Pending"});saveReports()}
 return {rooms,reports,addRoom,updateRoom,deleteRoom,addReport}
})