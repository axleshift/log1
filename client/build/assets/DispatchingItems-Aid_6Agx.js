import{l as cs,r as t,n as we,j as e,k as Ms,E as Vs,F as Bs,A as Os}from"./index-CCpuMsxg.js";import{G as qs,F as H,x as zs,a as Ie,y as Us,z as Gs,k as Ks,A as Ys,D as Es,B as Qs,b as Js,f as Xs,E as Zs}from"./index-BH_j_LWQ.js";import{a as F}from"./CButton-DmAcw923.js";import{C as ds,a as os,b as ps,c as hs}from"./CModalHeader-Rzzbjfxy.js";import{C as ei}from"./CForm-zbc4HfKx.js";import{C as Ls}from"./CFormSelect-BDrz7j5v.js";import{C as L,a as si}from"./CFormInput-ICgbeGxF.js";import{C as ii}from"./CFormTextarea-D0H5vPFk.js";import{C as ai}from"./CInputGroup-CsKY1hXR.js";import{C as Ws}from"./1-B_VjtQoE.js";import{C as ni,a as ti,b as ks,c as Q,d as ri,e as J}from"./CTable-BJmfdTuO.js";import{b as li,c as ci,d as di,a as oi}from"./DefaultLayout-C71bViqn.js";import{C as E}from"./CContainer-CMja4f4T.js";import{C as Hs,a as ke}from"./CPaginationItem-OtHycBAd.js";import{C as gs}from"./CAlert-ChSBoc-l.js";import{C as pi,a as hi,b as gi,c as mi}from"./CAccordionHeader-D6O1oWFb.js";import{C as Ps}from"./CCard-DvSaj6K8.js";import{C as Ts}from"./CCardHeader-BjcFUD05.js";import{C as Fs}from"./CCardBody-DGw-jhsr.js";import{C as _i,a as ui,b as $s,c as Rs}from"./CTabList-DUeiatVr.js";import"./index.esm-Ci2Fpm58.js";import"./cil-user-Ddrdy7PS.js";import"./getTransitionDurationFromElement-Cpu4p4hx.js";const vi=({shipment:g={},onSuccess:w=()=>{}})=>{const{showSuccess:k,showError:$}=cs(),[D,S]=t.useState(!1),[B,G]=t.useState(!1),[K,X]=t.useState([]),[A,R]=t.useState(""),[n,Z]=t.useState({dispatch:"Dispatching",shipping:{shipping_type:"",shipping_details:{destination_address:"",pickup_date:"",delivery_date:"",vehicle_type:"",destination_airport:"",preferred_departure_date:"",preferred_arrival_date:"",flight_type:"",loading_port:"",discharge_port:"",sailing_date:"",estimated_arrival_date:"",cargo_type:""}},vehicle:{name:"",plate_no:"",driver_name:""}});t.useEffect(()=>{D&&o()},[D]);const o=async()=>{try{const d=(await we.get("api/v1/vehicle")).data.data.filter(l=>l.status==="in_use");X(d)}catch{$("Error fetching vehicles")}},De=c=>{const d=c.target.value;Z(l=>({...l,shipping:{...l.shipping,shipping_type:d,shipping_details:{destination_address:"",pickup_date:"",delivery_date:"",vehicle_type:"",destination_airport:"",preferred_departure_date:"",preferred_arrival_date:"",flight_type:"",loading_port:"",discharge_port:"",sailing_date:"",estimated_arrival_date:"",cargo_type:""}}})),R("")},j=c=>{const{id:d,value:l}=c.target;Z(y=>({...y,shipping:{...y.shipping,shipping_details:{...y.shipping.shipping_details,[d]:l}}}))},b=c=>{const d=K.find(l=>l._id===c.target.value);d&&(R(c.target.value),Z(l=>{var y;return{...l,vehicle:{name:d.brand||"",plate_no:d.regisNumber||"",driver_name:((y=d.assignedDriver)==null?void 0:y.driverName)||""},shipping:{...l.shipping,shipping_details:{...l.shipping.shipping_details,vehicle_type:d.brand||""}}}}))},Ee=async()=>{var c,d;G(!0);try{let l={};n.shipping.shipping_type==="land"?l={delivery_date:n.shipping.shipping_details.delivery_date,vehicle_type:n.vehicle.plate_no}:n.shipping.shipping_type==="air"?l={destination_airport:n.shipping.shipping_details.destination_airport,preferred_departure_date:n.shipping.shipping_details.preferred_departure_date,preferred_arrival_date:n.shipping.shipping_details.preferred_arrival_date,flight_type:n.shipping.shipping_details.flight_type,vehicle_type:n.vehicle.plate_no}:n.shipping.shipping_type==="sea"&&(l={destination_address:n.shipping.shipping_details.destination_address,loading_port:n.shipping.shipping_details.loading_port,discharge_port:n.shipping.shipping_details.discharge_port,sailing_date:n.shipping.shipping_details.sailing_date,estimated_arrival_date:n.shipping.shipping_details.estimated_arrival_date,cargo_type:n.shipping.shipping_details.cargo_type,vehicle_type:n.vehicle.plate_no});const y={dispatch:n.dispatch,shipping:{shipping_type:n.shipping.shipping_type,shipping_details:l},vehicle:n.vehicle};(await Vs.put(`https://backend-log2.axleshift.com/api/v1/shipment/${g._id}`,y)).data.success&&(k("Shipment dispatched successfully"),S(!1),w())}catch(l){$(((d=(c=l.response)==null?void 0:c.data)==null?void 0:d.message)||"Error updating shipment")}finally{G(!1)}},O=()=>{Z({dispatch:"Dispatching",shipping:{shipping_type:"",shipping_details:{destination_address:"",pickup_date:"",delivery_date:"",vehicle_type:"",destination_airport:"",preferred_departure_date:"",preferred_arrival_date:"",flight_type:"",loading_port:"",discharge_port:"",sailing_date:"",estimated_arrival_date:"",cargo_type:""}},vehicle:{name:"",plate_no:"",driver_name:""}}),R("")},C=new Date,q=()=>e.jsxs(Ls,{className:"mb-3",label:"Select Vehicle *",value:A,onChange:b,children:[e.jsx("option",{value:"",children:"Choose a vehicle"}),K.map(c=>e.jsxs("option",{value:c._id,children:[c.brand," - ",c.regisNumber," ",c.assignedDriver?`(Driver: ${c.assignedDriver.driverName})`:"(No Driver)"]},c._id))]}),N=({icon:c})=>{const[d,l]=t.useState(!1);return e.jsx(H,{icon:c,bounce:d,onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs(F,{color:"primary",variant:"outline",className:"mb-3",onClick:()=>S(!D),children:[e.jsx(N,{icon:qs})," Dispatch"]}),e.jsxs(ds,{visible:D,onClose:()=>{S(!1),O()},size:"lg",children:[e.jsx(os,{children:"Dispatch Shipment"}),e.jsx(ps,{children:e.jsxs(ei,{children:[e.jsxs(Ls,{className:"mb-3",value:n.shipping.shipping_type||"",onChange:De,label:"Shipping Type *",required:!0,children:[e.jsx("option",{value:"",children:"Select shipping type"}),e.jsx("option",{value:"land",children:"Land"}),e.jsx("option",{value:"air",children:"Air"}),e.jsx("option",{value:"sea",children:"Sea"})]}),n.shipping.shipping_type&&e.jsx(q,{}),n.shipping.shipping_type==="land"&&e.jsx("div",{className:"mb-3",children:e.jsx(L,{className:"mb-3",type:"datetime-local",id:"delivery_date",label:"Delivery Date *",min:C.toISOString().slice(0,16),value:n.shipping.shipping_details.delivery_date||"",onChange:j,required:!0})}),n.shipping.shipping_type==="air"&&e.jsxs("div",{className:"mb-3",children:[e.jsx(L,{className:"mb-3",type:"text",id:"destination_airport",label:"Destination Airport *",value:n.shipping.shipping_details.destination_airport||"",onChange:j,required:!0}),e.jsx(L,{className:"mb-3",type:"datetime-local",id:"preferred_departure_date",label:"Preferred Departure Date *",min:C.toISOString().slice(0,16),value:n.shipping.shipping_details.preferred_departure_date||"",onChange:j,required:!0}),e.jsx(L,{className:"mb-3",type:"datetime-local",id:"preferred_arrival_date",label:"Preferred Arrival Date *",min:C.toISOString().slice(0,16),value:n.shipping.shipping_details.preferred_arrival_date||"",onChange:j,required:!0}),e.jsx(ii,{className:"mb-3",type:"text",id:"flight_type",label:"Flight Details *",placeholder:"Flight Number, Airline, etc.",value:n.shipping.shipping_details.flight_type||"",onChange:j,required:!0})]}),n.shipping.shipping_type==="sea"&&e.jsxs("div",{className:"mb-3",children:[e.jsx(L,{className:"mb-3",type:"text",id:"loading_port",label:"Loading Port *",value:n.shipping.shipping_details.loading_port||"",onChange:j,required:!0}),e.jsx(L,{className:"mb-3",type:"text",id:"destination_address",label:"Vessle Name *",value:n.shipping.shipping_details.destination_address||"",onChange:j,required:!0}),e.jsx(L,{className:"mb-3",type:"text",id:"discharge_port",label:"Discharge Port *",value:n.shipping.shipping_details.discharge_port||"",onChange:j,required:!0}),e.jsx(L,{className:"mb-3",type:"datetime-local",id:"sailing_date",label:"Sailing Date *",min:C.toISOString().slice(0,16),value:n.shipping.shipping_details.sailing_date||"",onChange:j,required:!0}),e.jsx(L,{className:"mb-3",type:"datetime-local",id:"estimated_arrival_date",label:"Estimated Arrival Date *",min:C.toISOString().slice(0,16),value:n.shipping.shipping_details.estimated_arrival_date||"",onChange:j,required:!0}),e.jsx(L,{className:"mb-3",type:"text",id:"cargo_type",label:"Cargo Type *",value:n.shipping.shipping_details.cargo_type||"",onChange:j,required:!0})]})]})}),e.jsxs(hs,{children:[e.jsx(F,{color:"secondary",onClick:()=>{S(!1),O()},children:"Cancel"}),e.jsx(F,{color:"primary",onClick:Ee,disabled:B,children:B?e.jsx(Ms,{size:"sm"}):"Dispatch Shipment"})]})]})]})},xi=({shipment:g={},onSuccess:w=()=>{}})=>{var q;const{showError:k,showSuccess:$}=cs(),[D,S]=t.useState(!1),[B,G]=t.useState(!1),[K,X]=t.useState([]),[A,R]=t.useState(null),[n,Z]=t.useState(null),[o,De]=t.useState(null),j=()=>{S(!0)},b=()=>{S(!1)},Ee=N=>{const c=N.target.files[0];if(c){if(!c.type.match("image.*")){k("Please select an image file");return}R(c);const d=new FileReader;d.onloadend=()=>{De(d.result)},d.readAsDataURL(c)}};t.useEffect(()=>{(async()=>{var c,d;try{const l=await we.get("/api/v1/warehouseLoc/locations");l.data.data&&X(l.data.data)}catch(l){setLocalError((c=l==null?void 0:l.response)==null?void 0:c.data.message),k(((d=l==null?void 0:l.response)==null?void 0:d.data.message)||"Error fetching warehouses")}})()},[]);const O=async()=>{var N,c,d,l,y,ee,P,se,i,p,_,f,u,v,z,U,M,V,ie,ae,ne,te,re,le,ce,de,oe,pe,he,ge;if(!(g!=null&&g._id)){k("Invalid shipment data");return}G(!0);try{const T=Bs(),r=(await Vs.get(`https://backend-log2.axleshift.com/api/v1/shipment/${g._id}`)).data.shipment,Y=new FormData;if(A&&Y.append("photo",A),!((N=r.shipping)!=null&&N.shipping_type)){k("Shipping type is required");return}const Ae={shipper:{company_name:r.shipper.shipper_company_name,contact_name:r.shipper.shipper_contact_name,email:r.shipper.shipper_contact_email_address,phone:r.shipper.shipper_contact_phone_number,address:r.shipper.shipper_company_address},consignee:{company_name:r.consignee.consignee_company_name,contact_name:r.consignee.consignee_contact_name,email:r.consignee.consignee_contact_email_address,phone:r.consignee.consignee_contact_phone_number,address:r.consignee.consignee_company_address},shipment:{description:r.shipment.shipment_description,weight:r.shipment.shipment_weight,dimension:{length:r.shipment.shipment_dimension_length,width:r.shipment.shipment_dimension_width,height:r.shipment.shipment_dimension_height},tracking_id:r.tracking_id,isInWarehouse:!1},vehicle:{name:r.vehicle.name,plate_no:r.vehicle.plate_no,driver_name:r.vehicle.driver_name},warehouse_id:r.warehouse_id,shipping:{shipping_type:(c=r.shipping)==null?void 0:c.shipping_type,shipping_details:{destination_address:((l=(d=r.shipping)==null?void 0:d.shipping_details)==null?void 0:l.destination_address)||"",pickup_date:((ee=(y=r.shipping)==null?void 0:y.shipping_details)==null?void 0:ee.pickup_date)||"",delivery_date:((se=(P=r.shipping)==null?void 0:P.shipping_details)==null?void 0:se.delivery_date)||"",vehicle_type:((p=(i=r.shipping)==null?void 0:i.shipping_details)==null?void 0:p.vehicle_type)||"",destination_airport:((f=(_=r.shipping)==null?void 0:_.shipping_details)==null?void 0:f.destination_airport)||"",preferred_departure_date:((v=(u=r.shipping)==null?void 0:u.shipping_details)==null?void 0:v.preferred_departure_date)||"",preferred_arrival_date:((U=(z=r.shipping)==null?void 0:z.shipping_details)==null?void 0:U.preferred_arrival_date)||"",flight_type:((V=(M=r.shipping)==null?void 0:M.shipping_details)==null?void 0:V.flight_type)||"",loading_port:((ae=(ie=r.shipping)==null?void 0:ie.shipping_details)==null?void 0:ae.loading_port)||"",discharge_port:((te=(ne=r.shipping)==null?void 0:ne.shipping_details)==null?void 0:te.discharge_port)||"",sailing_date:((le=(re=r.shipping)==null?void 0:re.shipping_details)==null?void 0:le.sailing_date)||"",estimated_arrival_date:((de=(ce=r.shipping)==null?void 0:ce.shipping_details)==null?void 0:de.estimated_arrival_date)||"",cargo_type:((pe=(oe=r.shipping)==null?void 0:oe.shipping_details)==null?void 0:pe.cargo_type)||""}},tracking_id:r.tracking_id,receiveDate:new Date().toISOString(),receiveBy:T};Y.append("data",JSON.stringify(Ae));const s=await we.post("api/v1/dispatch/add",Y,{headers:{"Content-Type":"multipart/form-data"}}),a=await we.put(`https://backend-log2.axleshift.com/api/v1/shipment/${g._id}`,{isInWarehouse:!1,dispatch:"Completed"});s.status===201&&a.status===200&&($("Shipment completed and copied to receiving successfully"),b(),w&&w())}catch(T){k(((ge=(he=T==null?void 0:T.response)==null?void 0:he.data)==null?void 0:ge.message)||"Error completing shipment"),console.error("Error completing shipment:",T)}finally{G(!1)}};if((g==null?void 0:g.paid)==="Paid")return null;const C=({icon:N})=>{const[c,d]=t.useState(!1);return e.jsx(H,{icon:N,bounce:c,onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs(F,{className:"mb-2",color:"success",variant:"outline",onClick:j,disabled:B||!((q=g==null?void 0:g.vehicle)!=null&&q.name),children:[e.jsx(C,{icon:zs})," Complete"]}),e.jsxs(ds,{visible:D,onClose:b,backdrop:"static",children:[e.jsx(os,{closeButton:!0,children:e.jsx("h5",{children:"Complete Shipment"})}),e.jsx(ps,{children:e.jsxs("div",{className:"mb-3",children:[e.jsx("h6",{children:"Shipment Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tracking ID:"})," ",g==null?void 0:g.tracking_id]}),e.jsx(si,{htmlFor:"receipt",children:"Picture Of Receipts"}),e.jsx(ai,{className:"mb-3",children:e.jsx(L,{type:"file",id:"receipt",accept:"images/*",onChange:Ee})}),o&&e.jsx("div",{className:"mb-3",children:e.jsx(Ws,{src:o,rounded:!0,align:"center",alt:"Receipts",width:200,height:200})}),e.jsx("div",{className:"alert alert-info mt-3",children:e.jsxs("small",{children:[e.jsx("strong",{children:"Note:"})," This action will:",e.jsx("ul",{className:"mb-0",children:e.jsx("li",{children:" Complete the Dispatching"})})]})})]})}),e.jsxs(hs,{children:[e.jsx(F,{color:"secondary",variant:"outline",className:"mb-3",onClick:b,disabled:B,children:"Cancel"}),e.jsx(F,{className:"mb-3",color:"primary",variant:"outline",onClick:O,disabled:B||!o,children:B?e.jsxs(e.Fragment,{children:[e.jsx(Ms,{size:"sm",className:"me-2"}),"Completing..."]}):"Complete Shipment"})]})]})]})},ji=()=>{var V,ie,ae,ne,te,re,le,ce,de,oe,pe,he,ge,T,Le,r,Y,Ae;const[g,w]=t.useState([]),[k,$]=t.useState(!1),[D,S]=t.useState(null),[B,G]=t.useState([]),[K,X]=t.useState(""),[A,R]=t.useState([]),{showError:n,showSuccess:Z}=cs(),[o,De]=t.useState(null),[j,b]=t.useState(!1),[Ee,O]=t.useState(!1),[C,q]=t.useState(1),[N]=t.useState(10),[c,d]=t.useState(!1),l=async()=>{var s,a,h,m;$(!0);try{const x=await we.get("https://backend-log2.axleshift.com/api/v1/shipment");if(x.status===200){const I=x.data.shipments||[];w(I),S(null)}}catch(x){S(((a=(s=x==null?void 0:x.response)==null?void 0:s.data)==null?void 0:a.message)||"Error fetching data"),n(((m=(h=x==null?void 0:x.response)==null?void 0:h.data)==null?void 0:m.message)||"Error fetching data")}finally{$(!1)}};t.useEffect(()=>{(async()=>{var a,h;try{const m=await we.get("/api/v1/warehouseLoc/locations");m.data.data&&R(m.data.data)}catch(m){setLocalError((a=m==null?void 0:m.response)==null?void 0:a.data.message),n(((h=m==null?void 0:m.response)==null?void 0:h.data.message)||"Error fetching warehouses")}})()},[]);const y=s=>{if(!A.length)return"Loading...";const a=A.find(h=>h._id===s);return a?a.warehouseName:"Not Yet Assigned"},ee=s=>{if(!A.length)return"Loading...";const a=A.find(h=>h._id===s);return a?a.address:"Not Yet Assigned"},P=g.filter(s=>{var h,m,x,I,W,me,_e,ue,ve,xe,je,fe,ye,be,Ce,Ne,Se;const a=K.toLowerCase();return((h=s.tracking_id)==null?void 0:h.toLowerCase().includes(a))||((x=(m=s.shipper)==null?void 0:m.shipper_company_name)==null?void 0:x.toLowerCase().includes(a))||((W=(I=s.consignee)==null?void 0:I.consignee_company_name)==null?void 0:W.toLowerCase().includes(a))||((me=s.type)==null?void 0:me.toLowerCase().includes(a))||((_e=s.dispatch)==null?void 0:_e.toLowerCase().includes(a))||((ue=s.paid)==null?void 0:ue.toLowerCase().includes(a))||((xe=(ve=s.vehicle)==null?void 0:ve.driver_name)==null?void 0:xe.toLowerCase().includes(a))||((fe=(je=s.vehicle)==null?void 0:je.vehicle_plate_no)==null?void 0:fe.toLowerCase().includes(a))||((be=(ye=s.vehicle)==null?void 0:ye.name)==null?void 0:be.toLowerCase().includes(a))||((Ne=(Ce=s.vehicle)==null?void 0:Ce.plate_no)==null?void 0:Ne.toLowerCase().includes(a))||((Se=y(s.warehouse_id))==null?void 0:Se.toLowerCase().includes(a))}),se=C*N,i=se-N,p=P.slice(i,se),_=Math.ceil(P.length/N),f=s=>s?new Date(s).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"N/A",u=s=>{switch(s==null?void 0:s.toLowerCase()){case"pending":return"warning";case"dispatching":return"info";case"completed":return"success";case"unpaid":return"danger";case"paid":return"success";case"void":return"secondary";default:return"primary"}},v=s=>{try{const a=g.find(h=>h.tracking_id===s);De(a),b(!0)}catch{n("Error viewing shipment details")}};t.useEffect(()=>{l()},[]);const z=s=>{var I,W,me,_e,ue,ve,xe,je,fe,ye,be,Ce,Ne,Se,Pe,Te,Fe,$e,Re,Me,Ve,We,He,Be,Oe,qe,ze,Ue,Ge,Ke,Ye,Qe,Je,Xe,Ze,es,ss,is,as,ns,ts,rs;const a=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),h=ls=>new Intl.NumberFormat("en-US",{style:"currency",currency:"PHP"}).format(ls),m=((I=s.shipping)==null?void 0:I.shipping_type)==="air"?`
    <div class="section">
      <div class="section-title">AIR FREIGHT DETAILS</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Destination Airport:</span>
          <span class="value">${((me=(W=s.shipping)==null?void 0:W.shipping_details)==null?void 0:me.destination_airport)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Flight Details:</span>
          <span class="value">${((ue=(_e=s.shipping)==null?void 0:_e.shipping_details)==null?void 0:ue.flight_type)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Preferred Departure:</span>
          <span class="value">${f((xe=(ve=s.shipping)==null?void 0:ve.shipping_details)==null?void 0:xe.preferred_departure_date)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Preferred Arrival:</span>
          <span class="value">${f((fe=(je=s.shipping)==null?void 0:je.shipping_details)==null?void 0:fe.preferred_arrival_date)||"N/A"}</span>
        </div>
      </div>
    </div>
  `:"",x=((ye=s.shipping)==null?void 0:ye.shipping_type)==="sea"?`
    <div class="section">
      <div class="section-title">SEA FREIGHT DETAILS</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Port of Loading:</span>
          <span class="value">${((Ce=(be=s.shipping)==null?void 0:be.shipping_details)==null?void 0:Ce.loading_port)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Port of Discharge:</span>
          <span class="value">${((Se=(Ne=s.shipping)==null?void 0:Ne.shipping_details)==null?void 0:Se.discharge_port)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Vessel Name:</span>
          <span class="value">${((Te=(Pe=s.shipping)==null?void 0:Pe.shipping_details)==null?void 0:Te.destination_address)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Container Type:</span>
          <span class="value">${(($e=(Fe=s.shipping)==null?void 0:Fe.shipping_details)==null?void 0:$e.cargo_type)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Estimated Departure:</span>
          <span class="value">${f((Me=(Re=s.shipping)==null?void 0:Re.shipping_details)==null?void 0:Me.sailing_date)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Estimated Arrival:</span>
          <span class="value">${f((We=(Ve=s.shipping)==null?void 0:Ve.shipping_details)==null?void 0:We.estimated_arrival_date)||"N/A"}</span>
        </div>
      </div>
    </div>
  `:"";return`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
          }
          .company-logo {
            max-width: 150px;
            margin-bottom: 10px;
          }
          .document-title {
            font-size: 24px;
            font-weight: bold;
            margin: 10px 0;
          }
          .document-number {
            font-size: 14px;
            color: #666;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            background-color: #f5f5f5;
            padding: 5px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .info-item {
            margin-bottom: 5px;
          }
          .label {
            font-weight: bold;
            color: #666;
          }
          .value {
            color: #333;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          .signatures {
            margin-top: 50px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .signature-line {
            border-top: 1px solid #333;
            margin-top: 25px;
            padding-top: 5px;
            text-align: center;
          }
          @media print {
            body {
              padding: 0;
              margin: 20px;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <!-- Replace with your company logo -->
          <div class="document-title">RECEIVING COPY</div>
          <div class="document-number">Tracking ID: ${s.tracking_id}</div>
          <div>Date: ${a}</div>
        </div>
  
        <div class="section">
          <div class="section-title">Storage Details</div>
          <div class="info-grid">    
            <div class="info-item">
              <span class="label">Warehouse:</span>
              <span class="value">${y(s.warehouse_id)}</span>
            </div>
            <div class="info-item">
              <span class="label">Warehouse Address:</span>
              <span class="value">${ee(s.warehouse_id)}</span>
            </div>
            
          </div>
        </div>

        
        <div class="section">
          <div class="section-title">SHIPPER DETAILS</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Company:</span>
              <span class="value">${((He=s.shipper)==null?void 0:He.shipper_company_name)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Contact Person:</span>
              <span class="value">${((Be=s.shipper)==null?void 0:Be.shipper_contact_name)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Phone:</span>
              <span class="value">${((Oe=s.shipper)==null?void 0:Oe.shipper_contact_phone_number)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Email:</span>
              <span class="value">${((qe=s.shipper)==null?void 0:qe.shipper_contact_email_address)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Address:</span>
              <span class="value">${((ze=s.shipper)==null?void 0:ze.shipper_company_address)||"N/A"}</span>
            </div>
          </div>
        </div>
  
        <div class="section">
          <div class="section-title">CONSIGNEE DETAILS</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Company:</span>
              <span class="value">${((Ue=s.consignee)==null?void 0:Ue.consignee_company_name)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Contact Person:</span>
              <span class="value">${((Ge=s.consignee)==null?void 0:Ge.consignee_contact_name)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Phone:</span>
              <span class="value">${((Ke=s.consignee)==null?void 0:Ke.consignee_contact_phone_number)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Email:</span>
              <span class="value">${((Ye=s.consignee)==null?void 0:Ye.consignee_contact_email_address)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Address:</span>
              <span class="value">${((Qe=s.consignee)==null?void 0:Qe.consignee_company_address)||"N/A"}</span>
            </div>
          </div>
        </div>
  
        <div class="section">
          <div class="section-title">SHIPMENT DETAILS</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Description:</span>
              <span class="value">${((Je=s.shipment)==null?void 0:Je.shipment_description)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Weight:</span>
              <span class="value">${((Xe=s.shipment)==null?void 0:Xe.shipment_weight)||"0"} kg</span>
            </div>
            <div class="info-item">
              <span class="label">Dimensions:</span>
              <span class="value">${((Ze=s.shipment)==null?void 0:Ze.shipment_dimension_length)||"0"} x ${((es=s.shipment)==null?void 0:es.shipment_dimension_width)||"0"} x ${((ss=s.shipment)==null?void 0:ss.shipment_dimension_height)||"0"} cm</span>
            </div>
            <div class="info-item">
              <span class="label">Volume:</span>
              <span class="value">${((is=s.shipment)==null?void 0:is.shipment_volume)||"0"} m³</span>
            </div>
            <div class="info-item">
              <span class="label">Declared Value:</span>
              <span class="value">${h(((as=s.shipment)==null?void 0:as.shipment_value)||0)}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">VEHICLE INFORMATION</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Vehicle:</span>
              <span class="value">${((ns=s.vehicle)==null?void 0:ns.name)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Plate No:</span>
              <span class="value">${((ts=s.vehicle)==null?void 0:ts.plate_no)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Driver:</span>
              <span class="value">${((rs=s.vehicle)==null?void 0:rs.driver_name)||"N/A"}</span>
            </div>
          </div>
        </div>

              ${m}
              ${x}
              

  
        <div class="signatures">
          <div>
            <div class="signature-line">
              Received by (Name & Signature)
            </div>
          </div>
          <div>
            <div class="signature-line">
              Authorized by (Name & Signature)
            </div>
          </div>
        </div>
  
        <div class="footer">
          <p>This is an official receiving copy. Please retain for your records.</p>
          <p>Generated on: ${new Date().toLocaleString()}</p>
        </div>
      </body>
      </html>
    `},U=s=>{const a=z(s),h=window.open("","_blank");h.document.write(a),h.document.close(),h.print()},M=({icon:s})=>{const[a,h]=t.useState(!1);return e.jsx(H,{icon:s,bounce:a,onMouseEnter:()=>h(!0),onMouseLeave:()=>h(!1)})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mb-3",children:e.jsxs("div",{className:"row align-items-center",children:[e.jsx("div",{className:"col-md-6",children:e.jsx(L,{type:"text",className:"mb-2",id:"searchInput9",placeholder:"Search shipments...",value:K,onChange:s=>X(s.target.value)})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"text-end",children:e.jsxs("span",{className:"text-muted",children:["Total Records:"," ",P.filter(s=>s.isInWarehouse).length]})})})]})}),Array.isArray(g)&&g.length>0?e.jsxs(e.Fragment,{children:[e.jsxs(ni,{hover:!0,responsive:!0,children:[e.jsx(ti,{className:"text-center",children:e.jsxs(ks,{children:[e.jsx(Q,{children:"Tracking ID"}),e.jsx(Q,{children:"Status"}),e.jsx(Q,{children:"Shipper"}),e.jsx(Q,{children:"Consignee"}),e.jsx(Q,{children:"Consignee Address"}),e.jsx(Q,{children:"Vehicle"}),e.jsx(Q,{children:"Driver"}),e.jsx(Q,{children:"Storage Warehouse"}),e.jsx(Q,{children:"Actions"})]})}),e.jsx(ri,{className:"text-center",children:p.filter(s=>s.isInWarehouse).map(s=>{var a,h,m,x,I,W;return e.jsxs(ks,{children:[e.jsx(J,{children:s.tracking_id}),e.jsx(J,{children:e.jsx(Ie,{color:u(s.dispatch),children:s.dispatch||"N/A"})}),e.jsx(J,{children:((a=s.shipper)==null?void 0:a.shipper_company_name)||"N/A"}),e.jsx(J,{children:((h=s.consignee)==null?void 0:h.consignee_company_name)||"N/A"}),e.jsx(J,{children:((m=s.consignee)==null?void 0:m.consignee_company_address)||"N/A"}),e.jsx(J,{children:(x=s.vehicle)!=null&&x.name&&((I=s.vehicle)!=null&&I.plate_no)?e.jsxs(Ie,{color:"info",children:[s.vehicle.name," (",s.vehicle.plate_no,")"]}):e.jsx(Ie,{color:"secondary",children:"N/A"})}),e.jsx(J,{children:(W=s.vehicle)!=null&&W.driver_name?e.jsx(Ie,{color:"info",children:s.vehicle.driver_name}):e.jsx(Ie,{color:"secondary",children:"N/A"})}),e.jsx(J,{children:s.warehouse_id?e.jsx(Ie,{color:"success",children:y(s.warehouse_id)}):e.jsx(Ie,{color:"secondary",children:"N/A"})}),e.jsx(J,{children:e.jsxs(li,{children:[e.jsx(ci,{color:"secondary",size:"sm",children:"Actions"}),e.jsx(di,{children:e.jsxs(E,{children:[e.jsxs(F,{color:"info",variant:"outline",className:"mb-3",onClick:()=>v(s.tracking_id),children:[e.jsx(M,{icon:Us})," View"]}),e.jsxs(F,{color:"secondary",variant:"outline",className:"mb-3",onClick:()=>U(s),disabled:k||!s.vehicle.name,children:[e.jsx(M,{icon:Gs})," Print"]}),e.jsx(vi,{shipment:s,onSuccess:l}),e.jsx(xi,{shipment:s,onSuccess:l})]})})]})})]},s.tracking_id)})})]}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-3",children:[e.jsx("div",{children:e.jsxs("span",{className:"text-muted",children:["Showing ",i+1," to"," ",Math.min(se,P.filter(s=>s.isInWarehouse).length)," ","of ",P.filter(s=>s.isInWarehouse).length," entries"]})}),e.jsxs(Hs,{"aria-label":"Page navigation",children:[e.jsx(ke,{"aria-label":"Previous",disabled:C===1,onClick:()=>q(C-1),children:e.jsx("span",{"aria-hidden":"true",children:"Previous"})}),[...Array(_)].map((s,a)=>e.jsx(ke,{active:C===a+1,onClick:()=>q(a+1),children:a+1},a+1)),e.jsx(ke,{"aria-label":"Next",disabled:C===_,onClick:()=>q(C+1),children:e.jsx("span",{"aria-hidden":"true",children:"Next"})})]})]})]}):e.jsx(gs,{color:"success",className:"text-center p-4",children:"No shipment records found"}),e.jsxs(ds,{visible:j,onClose:()=>b(!1),size:"lg",children:[e.jsx(os,{closeButton:!0,children:e.jsx("h5",{children:"Shipment Details"})}),e.jsx(ps,{children:o&&e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Basic Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tracking ID:"})," ",o.tracking_id]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dispatch Status:"})," ",o.dispatch]})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Shipping Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Country:"})," ",o.country]})]})]}),e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Shipper Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(V=o.shipper)==null?void 0:V.shipper_company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(ie=o.shipper)==null?void 0:ie.shipper_contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(ae=o.shipper)==null?void 0:ae.shipper_contact_email_address]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(ne=o.shipper)==null?void 0:ne.shipper_contact_phone_number]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(te=o.shipper)==null?void 0:te.shipper_company_address]})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Consignee Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(re=o.consignee)==null?void 0:re.consignee_company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(le=o.consignee)==null?void 0:le.consignee_contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(ce=o.consignee)==null?void 0:ce.consignee_contact_email_address]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(de=o.consignee)==null?void 0:de.consignee_contact_phone_number]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(oe=o.consignee)==null?void 0:oe.consignee_company_address]})]})]}),e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-12",children:[e.jsx("h6",{children:"Shipment Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Description:"})," ",(pe=o.shipment)==null?void 0:pe.shipment_description]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Weight:"})," ",(he=o.shipment)==null?void 0:he.shipment_weight," kg"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dimensions:"})," ",(ge=o.shipment)==null?void 0:ge.shipment_dimension_length," x"," ",(T=o.shipment)==null?void 0:T.shipment_dimension_width," x"," ",(Le=o.shipment)==null?void 0:Le.shipment_dimension_height," cm"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Volume:"})," ",(r=o.shipment)==null?void 0:r.shipment_volume," m³"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Value:"})," ",(Y=o.shipment)==null?void 0:Y.shipment_value]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Instructions:"})," ",(Ae=o.shipment)==null?void 0:Ae.shipment_instructions]})]})})]})}),e.jsx(hs,{children:e.jsx(F,{color:"secondary",variant:"outline",onClick:()=>b(!1),children:"Close"})})]})]})},fi=()=>{const{showSuccess:g,showError:w}=cs(),[k,$]=t.useState([]),[D,S]=t.useState([]),[B,G]=t.useState(!0),[K,X]=t.useState(null),[A,R]=t.useState(null),[n,Z]=t.useState(""),o="https://backend-log1.axleshift.com/",[De,j]=t.useState(!1),[b,Ee]=t.useState(1),[O]=t.useState(10),C=i=>{if(i.photo){const p=`${o}uploads/dispatchReceipts/${i.photo}`;R(p),j(!0)}else w("No receipt image available")};t.useEffect(()=>{q()},[]);const q=async()=>{var i,p,_,f;try{G(!0);const u=await we.get("/api/v1/dispatch/all");$(u.data.data)}catch(u){X(((p=(i=u==null?void 0:u.response)==null?void 0:i.data)==null?void 0:p.message)||"Error fetching data"),w(((f=(_=u==null?void 0:u.response)==null?void 0:_.data)==null?void 0:f.message)||"Error fetching receiving history")}finally{G(!1)}};t.useEffect(()=>{(async()=>{var p,_,f,u;try{const v=await we.get("/api/v1/warehouseLoc/locations");v.data.data&&S(v.data.data)}catch(v){X((_=(p=v==null?void 0:v.response)==null?void 0:p.data)==null?void 0:_.message),w(((u=(f=v==null?void 0:v.response)==null?void 0:f.data)==null?void 0:u.message)||"Error fetching warehouses")}})()},[]);const N=i=>{if(!D.length)return"Loading...";const p=D.find(_=>_._id===i);return p?p.warehouseName:"N/A"},c=k.filter(i=>{var _,f,u,v,z,U,M,V;const p=n.toLowerCase();return((_=i.shipment.tracking_id)==null?void 0:_.toLowerCase().includes(p))||((u=(f=i.shipper)==null?void 0:f.company_name)==null?void 0:u.toLowerCase().includes(p))||((z=(v=i.consignee)==null?void 0:v.company_name)==null?void 0:z.toLowerCase().includes(p))||((M=(U=i.vehicle)==null?void 0:U.name)==null?void 0:M.toLowerCase().includes(p))||((V=i.receiveBy)==null?void 0:V.toLowerCase().includes(p))}),d=b*O,l=d-O,y=c.slice(l,d),ee=Math.ceil(c.length/O),P=i=>{Ee(i)};if(B)return e.jsx("div",{className:"text-center py-5",children:"Loading..."});const se=({icon:i})=>{const[p,_]=t.useState(!1);return e.jsx(H,{icon:i,bounce:p,onMouseEnter:()=>_(!0),onMouseLeave:()=>_(!1)})};return e.jsxs("div",{className:"container-fluid px-4",children:[e.jsx("h1",{className:"mt-4",children:"Receiving History"}),e.jsx("div",{className:"mb-4",children:e.jsxs("div",{className:"input-group",children:[e.jsx("span",{className:"input-group-text",children:e.jsx(H,{icon:Ks})}),e.jsx(L,{placeholder:"Search by tracking ID, company, receiver...",value:n,id:"searchInput",onChange:i=>Z(i.target.value)})]})}),e.jsx("div",{children:e.jsxs("div",{children:[e.jsx(pi,{children:y.map((i,p)=>{var _,f,u,v,z,U,M,V,ie,ae,ne,te,re,le,ce,de,oe,pe,he,ge,T,Le,r,Y,Ae,s,a,h,m,x,I,W,me,_e,ue,ve,xe,je,fe,ye,be,Ce,Ne,Se,Pe,Te,Fe,$e,Re,Me,Ve,We,He,Be,Oe,qe,ze,Ue,Ge,Ke,Ye,Qe,Je,Xe,Ze,es,ss,is,as,ns,ts,rs,ls,ms,_s,us,vs,xs,js,fs,ys,bs,Cs,Ns,Ss,ws,Ds,As,Is;return e.jsxs(hi,{children:[e.jsx(gi,{children:e.jsxs("div",{className:"d-flex justify-content-between w-100 me-3",children:[e.jsxs("span",{children:[e.jsx(H,{icon:Ys,className:"me-2"}),"Tracking ID: ",(_=i.shipment)==null?void 0:_.tracking_id]}),e.jsxs("span",{children:["Dispatch Date ",new Date(i.receiveDate).toLocaleDateString()]})]})}),e.jsxs(mi,{children:[e.jsxs("div",{className:"row g-3 mb-3  justify-content-between",children:[e.jsx("div",{className:"col-md-3",children:e.jsxs(E,{children:[e.jsxs(E,{className:"me-2 mb-3",children:[e.jsx(H,{icon:Es,className:"me-2"}),e.jsx("strong",{children:"Shipping Details"})]}),e.jsxs(E,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Shipping Type:"})," ",(f=i.shipping)==null?void 0:f.shipping_type]}),e.jsx("p",{children:((v=(u=i.shipping)==null?void 0:u.shipping_details)==null?void 0:v.destination_address)!=null&&((U=(z=i.shipping)==null?void 0:z.shipping_details)==null?void 0:U.destination_address)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Destination Address:"})," ",(V=(M=i.shipping)==null?void 0:M.shipping_details)==null?void 0:V.destination_address]})}),e.jsx("p",{children:((ae=(ie=i.shipping)==null?void 0:ie.shipping_details)==null?void 0:ae.loading_port)!=null&&((te=(ne=i.shipping)==null?void 0:ne.shipping_details)==null?void 0:te.loading_port)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Loading Port:"})," ",(le=(re=i.shipping)==null?void 0:re.shipping_details)==null?void 0:le.loading_port]})}),e.jsx("p",{children:((de=(ce=i.shipping)==null?void 0:ce.shipping_details)==null?void 0:de.discharge_port)!=null&&((pe=(oe=i.shipping)==null?void 0:oe.shipping_details)==null?void 0:pe.discharge_port)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Discharge Port:"})," ",(ge=(he=i.shipping)==null?void 0:he.shipping_details)==null?void 0:ge.discharge_port]})}),e.jsx("p",{children:((Le=(T=i.shipping)==null?void 0:T.shipping_details)==null?void 0:Le.sailing_date)!=null&&((Y=(r=i.shipping)==null?void 0:r.shipping_details)==null?void 0:Y.sailing_date)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Sailing Date:"})," ",new Date((s=(Ae=i.shipping)==null?void 0:Ae.shipping_details)==null?void 0:s.sailing_date).toLocaleDateString()]})}),e.jsx("p",{children:((h=(a=i.shipping)==null?void 0:a.shipping_details)==null?void 0:h.estimated_arrival_date)!=null&&((x=(m=i.shipping)==null?void 0:m.shipping_details)==null?void 0:x.estimated_arrival_date)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Estimated Arrival Date:"})," ",new Date((W=(I=i.shipping)==null?void 0:I.shipping_details)==null?void 0:W.estimated_arrival_date).toLocaleDateString()]})}),e.jsx("p",{children:((_e=(me=i.shipping)==null?void 0:me.shipping_details)==null?void 0:_e.cargo_type)!=null&&((ve=(ue=i.shipping)==null?void 0:ue.shipping_details)==null?void 0:ve.cargo_type)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Cargo Type:"})," ",(je=(xe=i.shipping)==null?void 0:xe.shipping_details)==null?void 0:je.cargo_type]})}),e.jsx("p",{children:((ye=(fe=i.shipping)==null?void 0:fe.shipping_details)==null?void 0:ye.destination_airport)!=null&&((Ce=(be=i.shipping)==null?void 0:be.shipping_details)==null?void 0:Ce.destination_airport)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Destination airport:"})," ",(Se=(Ne=i.shipping)==null?void 0:Ne.shipping_details)==null?void 0:Se.destination_airport]})}),e.jsx("p",{children:((Te=(Pe=i.shipping)==null?void 0:Pe.shipping_details)==null?void 0:Te.delivery_date)!=null&&(($e=(Fe=i.shipping)==null?void 0:Fe.shipping_details)==null?void 0:$e.delivery_date)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Delivery Date:"})," ",new Date((Me=(Re=i.shipping)==null?void 0:Re.shipping_details)==null?void 0:Me.delivery_date).toLocaleDateString()]})}),e.jsx("p",{children:((We=(Ve=i.shipping)==null?void 0:Ve.shipping_details)==null?void 0:We.flight_type)!=null&&((Be=(He=i.shipping)==null?void 0:He.shipping_details)==null?void 0:Be.flight_type)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Flight Details:"})," ",(qe=(Oe=i.shipping)==null?void 0:Oe.shipping_details)==null?void 0:qe.flight_type]})}),e.jsx("p",{children:((Ue=(ze=i.shipping)==null?void 0:ze.shipping_details)==null?void 0:Ue.preferred_arrival_date)!=null&&((Ke=(Ge=i.shipping)==null?void 0:Ge.shipping_details)==null?void 0:Ke.preferred_arrival_date)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Arrival Date:"})," ",new Date((Qe=(Ye=i.shipping)==null?void 0:Ye.shipping_details)==null?void 0:Qe.preferred_arrival_date).toLocaleDateString()]})}),e.jsx("p",{children:((Xe=(Je=i.shipping)==null?void 0:Je.shipping_details)==null?void 0:Xe.preferred_departure_date)!=null&&((es=(Ze=i.shipping)==null?void 0:Ze.shipping_details)==null?void 0:es.flight_type)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Departure Date:"})," ",new Date((is=(ss=i.shipping)==null?void 0:ss.shipping_details)==null?void 0:is.preferred_departure_date).toLocaleDateString()]})})]})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs(E,{children:[e.jsxs(E,{className:" mb-3",children:[e.jsx(H,{icon:Qs,className:"me-2"}),e.jsx("strong",{children:"Shipper Information"})]}),e.jsxs(E,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(as=i.shipper)==null?void 0:as.company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(ns=i.shipper)==null?void 0:ns.contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(ts=i.shipper)==null?void 0:ts.email]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(rs=i.shipper)==null?void 0:rs.phone]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(ls=i.shipper)==null?void 0:ls.address]})]})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs(E,{children:[e.jsxs(E,{className:"me-2 mb-3",children:[e.jsx(H,{icon:Js,className:"me-2"}),e.jsx("strong",{children:"Consignee Information"})]}),e.jsxs(E,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(ms=i.consignee)==null?void 0:ms.company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(_s=i.consignee)==null?void 0:_s.contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(us=i.consignee)==null?void 0:us.email]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(vs=i.consignee)==null?void 0:vs.phone]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(xs=i.consignee)==null?void 0:xs.address]})]})]})}),e.jsx(E,{className:"col-md-6",children:e.jsxs(Ps,{children:[e.jsxs(Ts,{children:[e.jsx(H,{icon:Es,className:"me-2"}),"Shipment Details"]}),e.jsxs(Fs,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Description:"})," ",(js=i.shipment)==null?void 0:js.description]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Weight:"})," ",(fs=i.shipment)==null?void 0:fs.weight," kg"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dimensions:"})," ",(bs=(ys=i.shipment)==null?void 0:ys.dimension)==null?void 0:bs.length," x"," ",(Ns=(Cs=i.shipment)==null?void 0:Cs.dimension)==null?void 0:Ns.width," x ",(ws=(Ss=i.shipment)==null?void 0:Ss.dimension)==null?void 0:ws.height," ","cm"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Warehouse:"})," ",N(i.warehouse_id)]})]})]})}),e.jsx(E,{className:"col-md-6",children:e.jsxs(Ps,{children:[e.jsxs(Ts,{children:[e.jsx(H,{icon:Xs,className:"me-2"}),"Vehicle use to transport"]}),e.jsxs(Fs,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Vehicle:"})," ",(Ds=i.vehicle)==null?void 0:Ds.name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Plate No:"})," ",(As=i.vehicle)==null?void 0:As.plate_no]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Driver:"})," ",(Is=i.vehicle)==null?void 0:Is.driver_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dispatch By:"})," ",i.receiveBy]})]})]})})]}),e.jsx("div",{className:"text-center mt-3",children:e.jsxs(F,{color:"primary",className:"me-2",variant:"outline",onClick:()=>C(i),children:[e.jsx(se,{icon:Zs,className:"me-2"}),"Photo"]})})]})]},i._id||p)})}),c.length>O&&e.jsxs(Hs,{className:"mt-4 justify-content-center","aria-label":"Page navigation",children:[e.jsx(ke,{onClick:()=>P(b-1),disabled:b===1,children:"Previous"}),[...Array(ee)].map((i,p)=>e.jsx(ke,{active:b===p+1,onClick:()=>P(p+1),children:p+1},p+1)),e.jsx(ke,{onClick:()=>P(b+1),disabled:b===ee,children:"Next"})]})]})}),e.jsx(E,{className:"text-center",children:e.jsxs(ds,{visible:De,onClose:()=>{j(!1),R(null)},size:"lg",alignment:"center",children:[e.jsx(os,{closeButton:!0,children:"Receipt Image"}),e.jsx(ps,{className:"text-center",children:A&&e.jsx(Ws,{src:A,alt:"Receipt",style:{maxWidth:"100%",maxHeight:"70vh",objectFit:"contain"},onError:i=>{w("Error loading image"),i.target.src="placeholder-image-url.jpg"}})}),e.jsxs(hs,{children:[e.jsx(F,{color:"secondary",variant:"outline",onClick:()=>{j(!1),R(null)},children:"Close"}),e.jsx("a",{href:A,target:"_blank",rel:"noopener noreferrer",children:e.jsx(F,{color:"primary",variant:"outline",children:"Open in New Tab"})})]})]})}),K&&e.jsx(gs,{color:"danger",children:K})]})},qi=()=>{const g=Os(),w=["admin","manager","super admin","warehouse manager","scheduler"],[k,$]=t.useState(0),D=()=>{$(S=>S+1)};return e.jsx(e.Fragment,{children:g&&w.includes(g)?e.jsxs(e.Fragment,{children:[e.jsx("h1",{children:"Dispatching Items"}),e.jsxs(_i,{activeItemKey:"Dispatching",children:[e.jsxs(ui,{variant:"tabs",children:[e.jsx($s,{itemKey:"Dispatching",children:"Dispatching"}),e.jsx($s,{itemKey:"Dispatching History",children:"Dispatching History"})]}),e.jsxs(oi,{children:[e.jsx(Rs,{className:"p-3",itemKey:"Dispatching",children:e.jsx(ji,{onSuccess:D})}),e.jsx(Rs,{className:"p-3",itemKey:"Dispatching History",children:e.jsx(fi,{onSuccess:D})})]})]})]}):e.jsx(gs,{color:"danger",className:"text-center justify-content-center m-5",children:"You do not have permission to access this page."})})};export{qi as default};
