import{l as cs,r as t,n as we,j as e,k as Rs,E as Ms,F as Bs}from"./index-B386DtYW.js";import{G as Os,F as W,x as qs,a as Ie,y as zs,z as Us,k as Gs,A as Ks,D as Is,B as Ys,b as Qs,f as Js,E as Xs}from"./index-BnAyFmm4.js";import{a as T}from"./CButton-uDoE_VQ2.js";import{C as ds,a as os,b as ps,c as hs}from"./CModalHeader-C6TgwmBU.js";import{C as Zs}from"./CForm-CyNpa2nH.js";import{C as Es}from"./CFormSelect-DjTXULm5.js";import{C as E,a as ei}from"./CFormInput-CX-MsJbV.js";import{C as si}from"./CFormTextarea-B7eNOCeY.js";import{C as ii}from"./CInputGroup-DaRiLCy9.js";import{C as Vs}from"./1-Dg9_j1ve.js";import{C as ai,a as ni,b as Ls,c as Q,d as ti,e as J}from"./CTable-DLG9qXrR.js";import{b as ri,c as li,d as ci,a as di}from"./DefaultLayout-BdGeyJ4G.js";import{C as I}from"./CContainer-A8oI_0h_.js";import{C as Ws,a as ke}from"./CPaginationItem-DaP0_pRy.js";import{C as Hs}from"./CAlert-GhDAFC45.js";import{C as oi,a as pi,b as hi,c as gi}from"./CAccordionHeader-YXIGB1NQ.js";import{C as ks}from"./CCard-Dn2ZYRWV.js";import{C as Ps}from"./CCardHeader-HMg3S-kI.js";import{C as Ts}from"./CCardBody-CpXFdrnQ.js";import{C as mi,a as _i,b as Fs,c as $s}from"./CTabList-CCcCPrOg.js";import"./index.esm-C9P4Zbfz.js";import"./cil-user-Ddrdy7PS.js";import"./getTransitionDurationFromElement-Cpu4p4hx.js";const ui=({shipment:g={},onSuccess:w=()=>{}})=>{const{showSuccess:S,showError:F}=cs(),[H,L]=t.useState(!1),[B,G]=t.useState(!1),[K,X]=t.useState([]),[D,$]=t.useState(""),[n,Z]=t.useState({dispatch:"Dispatching",shipping:{shipping_type:"",shipping_details:{destination_address:"",pickup_date:"",delivery_date:"",vehicle_type:"",destination_airport:"",preferred_departure_date:"",preferred_arrival_date:"",flight_type:"",loading_port:"",discharge_port:"",sailing_date:"",estimated_arrival_date:"",cargo_type:""}},vehicle:{name:"",plate_no:"",driver_name:""}});t.useEffect(()=>{H&&o()},[H]);const o=async()=>{try{const d=(await we.get("api/v1/vehicle")).data.data.filter(l=>l.status==="in_use");X(d)}catch{F("Error fetching vehicles")}},De=c=>{const d=c.target.value;Z(l=>({...l,shipping:{...l.shipping,shipping_type:d,shipping_details:{destination_address:"",pickup_date:"",delivery_date:"",vehicle_type:"",destination_airport:"",preferred_departure_date:"",preferred_arrival_date:"",flight_type:"",loading_port:"",discharge_port:"",sailing_date:"",estimated_arrival_date:"",cargo_type:""}}})),$("")},j=c=>{const{id:d,value:l}=c.target;Z(y=>({...y,shipping:{...y.shipping,shipping_details:{...y.shipping.shipping_details,[d]:l}}}))},b=c=>{const d=K.find(l=>l._id===c.target.value);d&&($(c.target.value),Z(l=>{var y;return{...l,vehicle:{name:d.brand||"",plate_no:d.regisNumber||"",driver_name:((y=d.assignedDriver)==null?void 0:y.driverName)||""},shipping:{...l.shipping,shipping_details:{...l.shipping.shipping_details,vehicle_type:d.brand||""}}}}))},Ee=async()=>{var c,d;G(!0);try{let l={};n.shipping.shipping_type==="land"?l={delivery_date:n.shipping.shipping_details.delivery_date,vehicle_type:n.vehicle.plate_no}:n.shipping.shipping_type==="air"?l={destination_airport:n.shipping.shipping_details.destination_airport,preferred_departure_date:n.shipping.shipping_details.preferred_departure_date,preferred_arrival_date:n.shipping.shipping_details.preferred_arrival_date,flight_type:n.shipping.shipping_details.flight_type,vehicle_type:n.vehicle.plate_no}:n.shipping.shipping_type==="sea"&&(l={destination_address:n.shipping.shipping_details.destination_address,loading_port:n.shipping.shipping_details.loading_port,discharge_port:n.shipping.shipping_details.discharge_port,sailing_date:n.shipping.shipping_details.sailing_date,estimated_arrival_date:n.shipping.shipping_details.estimated_arrival_date,cargo_type:n.shipping.shipping_details.cargo_type,vehicle_type:n.vehicle.plate_no});const y={dispatch:n.dispatch,shipping:{shipping_type:n.shipping.shipping_type,shipping_details:l},vehicle:n.vehicle};(await Ms.put(`https://backend-log2.axleshift.com/api/v1/shipment/${g._id}`,y)).data.success&&(S("Shipment dispatched successfully"),L(!1),w())}catch(l){F(((d=(c=l.response)==null?void 0:c.data)==null?void 0:d.message)||"Error updating shipment")}finally{G(!1)}},O=()=>{Z({dispatch:"Dispatching",shipping:{shipping_type:"",shipping_details:{destination_address:"",pickup_date:"",delivery_date:"",vehicle_type:"",destination_airport:"",preferred_departure_date:"",preferred_arrival_date:"",flight_type:"",loading_port:"",discharge_port:"",sailing_date:"",estimated_arrival_date:"",cargo_type:""}},vehicle:{name:"",plate_no:"",driver_name:""}}),$("")},C=new Date,q=()=>e.jsxs(Es,{className:"mb-3",label:"Select Vehicle *",value:D,onChange:b,children:[e.jsx("option",{value:"",children:"Choose a vehicle"}),K.map(c=>e.jsxs("option",{value:c._id,children:[c.brand," - ",c.regisNumber," ",c.assignedDriver?`(Driver: ${c.assignedDriver.driverName})`:"(No Driver)"]},c._id))]}),N=({icon:c})=>{const[d,l]=t.useState(!1);return e.jsx(W,{icon:c,bounce:d,onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs(T,{color:"primary",variant:"outline",className:"mb-3",onClick:()=>L(!H),children:[e.jsx(N,{icon:Os})," Dispatch"]}),e.jsxs(ds,{visible:H,onClose:()=>{L(!1),O()},size:"lg",children:[e.jsx(os,{children:"Dispatch Shipment"}),e.jsx(ps,{children:e.jsxs(Zs,{children:[e.jsxs(Es,{className:"mb-3",value:n.shipping.shipping_type||"",onChange:De,label:"Shipping Type *",required:!0,children:[e.jsx("option",{value:"",children:"Select shipping type"}),e.jsx("option",{value:"land",children:"Land"}),e.jsx("option",{value:"air",children:"Air"}),e.jsx("option",{value:"sea",children:"Sea"})]}),n.shipping.shipping_type&&e.jsx(q,{}),n.shipping.shipping_type==="land"&&e.jsx("div",{className:"mb-3",children:e.jsx(E,{className:"mb-3",type:"datetime-local",id:"delivery_date",label:"Delivery Date *",min:C.toISOString().slice(0,16),value:n.shipping.shipping_details.delivery_date||"",onChange:j,required:!0})}),n.shipping.shipping_type==="air"&&e.jsxs("div",{className:"mb-3",children:[e.jsx(E,{className:"mb-3",type:"text",id:"destination_airport",label:"Destination Airport *",value:n.shipping.shipping_details.destination_airport||"",onChange:j,required:!0}),e.jsx(E,{className:"mb-3",type:"datetime-local",id:"preferred_departure_date",label:"Preferred Departure Date *",min:C.toISOString().slice(0,16),value:n.shipping.shipping_details.preferred_departure_date||"",onChange:j,required:!0}),e.jsx(E,{className:"mb-3",type:"datetime-local",id:"preferred_arrival_date",label:"Preferred Arrival Date *",min:C.toISOString().slice(0,16),value:n.shipping.shipping_details.preferred_arrival_date||"",onChange:j,required:!0}),e.jsx(si,{className:"mb-3",type:"text",id:"flight_type",label:"Flight Details *",placeholder:"Flight Number, Airline, etc.",value:n.shipping.shipping_details.flight_type||"",onChange:j,required:!0})]}),n.shipping.shipping_type==="sea"&&e.jsxs("div",{className:"mb-3",children:[e.jsx(E,{className:"mb-3",type:"text",id:"loading_port",label:"Loading Port *",value:n.shipping.shipping_details.loading_port||"",onChange:j,required:!0}),e.jsx(E,{className:"mb-3",type:"text",id:"destination_address",label:"Vessle Name *",value:n.shipping.shipping_details.destination_address||"",onChange:j,required:!0}),e.jsx(E,{className:"mb-3",type:"text",id:"discharge_port",label:"Discharge Port *",value:n.shipping.shipping_details.discharge_port||"",onChange:j,required:!0}),e.jsx(E,{className:"mb-3",type:"datetime-local",id:"sailing_date",label:"Sailing Date *",min:C.toISOString().slice(0,16),value:n.shipping.shipping_details.sailing_date||"",onChange:j,required:!0}),e.jsx(E,{className:"mb-3",type:"datetime-local",id:"estimated_arrival_date",label:"Estimated Arrival Date *",min:C.toISOString().slice(0,16),value:n.shipping.shipping_details.estimated_arrival_date||"",onChange:j,required:!0}),e.jsx(E,{className:"mb-3",type:"text",id:"cargo_type",label:"Cargo Type *",value:n.shipping.shipping_details.cargo_type||"",onChange:j,required:!0})]})]})}),e.jsxs(hs,{children:[e.jsx(T,{color:"secondary",onClick:()=>{L(!1),O()},children:"Cancel"}),e.jsx(T,{color:"primary",onClick:Ee,disabled:B,children:B?e.jsx(Rs,{size:"sm"}):"Dispatch Shipment"})]})]})]})},vi=({shipment:g={},onSuccess:w=()=>{}})=>{var q;const{showError:S,showSuccess:F}=cs(),[H,L]=t.useState(!1),[B,G]=t.useState(!1),[K,X]=t.useState([]),[D,$]=t.useState(null),[n,Z]=t.useState(null),[o,De]=t.useState(null),j=()=>{L(!0)},b=()=>{L(!1)},Ee=N=>{const c=N.target.files[0];if(c){if(!c.type.match("image.*")){S("Please select an image file");return}$(c);const d=new FileReader;d.onloadend=()=>{De(d.result)},d.readAsDataURL(c)}};t.useEffect(()=>{(async()=>{var c,d;try{const l=await we.get("/api/v1/warehouseLoc/locations");l.data.data&&X(l.data.data)}catch(l){setLocalError((c=l==null?void 0:l.response)==null?void 0:c.data.message),S(((d=l==null?void 0:l.response)==null?void 0:d.data.message)||"Error fetching warehouses")}})()},[]);const O=async()=>{var N,c,d,l,y,ee,k,se,i,p,_,f,u,v,z,U,R,M,ie,ae,ne,te,re,le,ce,de,oe,pe,he,ge;if(!(g!=null&&g._id)){S("Invalid shipment data");return}G(!0);try{const P=Bs(),r=(await Ms.get(`https://backend-log2.axleshift.com/api/v1/shipment/${g._id}`)).data.shipment,Y=new FormData;if(D&&Y.append("photo",D),!((N=r.shipping)!=null&&N.shipping_type)){S("Shipping type is required");return}const Ae={shipper:{company_name:r.shipper.shipper_company_name,contact_name:r.shipper.shipper_contact_name,email:r.shipper.shipper_contact_email_address,phone:r.shipper.shipper_contact_phone_number,address:r.shipper.shipper_company_address},consignee:{company_name:r.consignee.consignee_company_name,contact_name:r.consignee.consignee_contact_name,email:r.consignee.consignee_contact_email_address,phone:r.consignee.consignee_contact_phone_number,address:r.consignee.consignee_company_address},shipment:{description:r.shipment.shipment_description,weight:r.shipment.shipment_weight,dimension:{length:r.shipment.shipment_dimension_length,width:r.shipment.shipment_dimension_width,height:r.shipment.shipment_dimension_height},tracking_id:r.tracking_id,isInWarehouse:!1},vehicle:{name:r.vehicle.name,plate_no:r.vehicle.plate_no,driver_name:r.vehicle.driver_name},warehouse_id:r.warehouse_id,shipping:{shipping_type:(c=r.shipping)==null?void 0:c.shipping_type,shipping_details:{destination_address:((l=(d=r.shipping)==null?void 0:d.shipping_details)==null?void 0:l.destination_address)||"",pickup_date:((ee=(y=r.shipping)==null?void 0:y.shipping_details)==null?void 0:ee.pickup_date)||"",delivery_date:((se=(k=r.shipping)==null?void 0:k.shipping_details)==null?void 0:se.delivery_date)||"",vehicle_type:((p=(i=r.shipping)==null?void 0:i.shipping_details)==null?void 0:p.vehicle_type)||"",destination_airport:((f=(_=r.shipping)==null?void 0:_.shipping_details)==null?void 0:f.destination_airport)||"",preferred_departure_date:((v=(u=r.shipping)==null?void 0:u.shipping_details)==null?void 0:v.preferred_departure_date)||"",preferred_arrival_date:((U=(z=r.shipping)==null?void 0:z.shipping_details)==null?void 0:U.preferred_arrival_date)||"",flight_type:((M=(R=r.shipping)==null?void 0:R.shipping_details)==null?void 0:M.flight_type)||"",loading_port:((ae=(ie=r.shipping)==null?void 0:ie.shipping_details)==null?void 0:ae.loading_port)||"",discharge_port:((te=(ne=r.shipping)==null?void 0:ne.shipping_details)==null?void 0:te.discharge_port)||"",sailing_date:((le=(re=r.shipping)==null?void 0:re.shipping_details)==null?void 0:le.sailing_date)||"",estimated_arrival_date:((de=(ce=r.shipping)==null?void 0:ce.shipping_details)==null?void 0:de.estimated_arrival_date)||"",cargo_type:((pe=(oe=r.shipping)==null?void 0:oe.shipping_details)==null?void 0:pe.cargo_type)||""}},tracking_id:r.tracking_id,receiveDate:new Date().toISOString(),receiveBy:P};Y.append("data",JSON.stringify(Ae));const s=await we.post("api/v1/dispatch/add",Y,{headers:{"Content-Type":"multipart/form-data"}}),a=await we.put(`https://backend-log2.axleshift.com/api/v1/shipment/${g._id}`,{isInWarehouse:!1,dispatch:"Completed"});s.status===201&&a.status===200&&(F("Shipment completed and copied to receiving successfully"),b(),w&&w())}catch(P){S(((ge=(he=P==null?void 0:P.response)==null?void 0:he.data)==null?void 0:ge.message)||"Error completing shipment"),console.error("Error completing shipment:",P)}finally{G(!1)}};if((g==null?void 0:g.paid)==="Paid")return null;const C=({icon:N})=>{const[c,d]=t.useState(!1);return e.jsx(W,{icon:N,bounce:c,onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs(T,{className:"mb-2",color:"success",variant:"outline",onClick:j,disabled:B||!((q=g==null?void 0:g.vehicle)!=null&&q.name),children:[e.jsx(C,{icon:qs})," Complete"]}),e.jsxs(ds,{visible:H,onClose:b,backdrop:"static",children:[e.jsx(os,{closeButton:!0,children:e.jsx("h5",{children:"Complete Shipment"})}),e.jsx(ps,{children:e.jsxs("div",{className:"mb-3",children:[e.jsx("h6",{children:"Shipment Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tracking ID:"})," ",g==null?void 0:g.tracking_id]}),e.jsx(ei,{htmlFor:"receipt",children:"Picture Of Receipts"}),e.jsx(ii,{className:"mb-3",children:e.jsx(E,{type:"file",id:"receipt",accept:"images/*",onChange:Ee})}),o&&e.jsx("div",{className:"mb-3",children:e.jsx(Vs,{src:o,rounded:!0,align:"center",alt:"Receipts",width:200,height:200})}),e.jsx("div",{className:"alert alert-info mt-3",children:e.jsxs("small",{children:[e.jsx("strong",{children:"Note:"})," This action will:",e.jsx("ul",{className:"mb-0",children:e.jsx("li",{children:" Complete the Dispatching"})})]})})]})}),e.jsxs(hs,{children:[e.jsx(T,{color:"secondary",variant:"outline",className:"mb-3",onClick:b,disabled:B,children:"Cancel"}),e.jsx(T,{className:"mb-3",color:"primary",variant:"outline",onClick:O,disabled:B||!o,children:B?e.jsxs(e.Fragment,{children:[e.jsx(Rs,{size:"sm",className:"me-2"}),"Completing..."]}):"Complete Shipment"})]})]})]})},xi=()=>{var M,ie,ae,ne,te,re,le,ce,de,oe,pe,he,ge,P,Le,r,Y,Ae;const[g,w]=t.useState([]),[S,F]=t.useState(!1),[H,L]=t.useState(null),[B,G]=t.useState([]),[K,X]=t.useState(""),[D,$]=t.useState([]),{showError:n,showSuccess:Z}=cs(),[o,De]=t.useState(null),[j,b]=t.useState(!1),[Ee,O]=t.useState(!1),[C,q]=t.useState(1),[N]=t.useState(10),[c,d]=t.useState(!1),l=async()=>{var s,a,h,m;F(!0);try{const x=await we.get("https://backend-log2.axleshift.com/api/v1/shipment");if(x.status===200){const A=x.data.shipments||[];w(A),L(null)}}catch(x){L(((a=(s=x==null?void 0:x.response)==null?void 0:s.data)==null?void 0:a.message)||"Error fetching data"),n(((m=(h=x==null?void 0:x.response)==null?void 0:h.data)==null?void 0:m.message)||"Error fetching data")}finally{F(!1)}};t.useEffect(()=>{(async()=>{var a,h;try{const m=await we.get("/api/v1/warehouseLoc/locations");m.data.data&&$(m.data.data)}catch(m){setLocalError((a=m==null?void 0:m.response)==null?void 0:a.data.message),n(((h=m==null?void 0:m.response)==null?void 0:h.data.message)||"Error fetching warehouses")}})()},[]);const y=s=>{if(!D.length)return"Loading...";const a=D.find(h=>h._id===s);return a?a.warehouseName:"Not Yet Assigned"},ee=s=>{if(!D.length)return"Loading...";const a=D.find(h=>h._id===s);return a?a.address:"Not Yet Assigned"},k=g.filter(s=>{var h,m,x,A,V,me,_e,ue,ve,xe,je,fe,ye,be,Ce,Ne,Se;const a=K.toLowerCase();return((h=s.tracking_id)==null?void 0:h.toLowerCase().includes(a))||((x=(m=s.shipper)==null?void 0:m.shipper_company_name)==null?void 0:x.toLowerCase().includes(a))||((V=(A=s.consignee)==null?void 0:A.consignee_company_name)==null?void 0:V.toLowerCase().includes(a))||((me=s.type)==null?void 0:me.toLowerCase().includes(a))||((_e=s.dispatch)==null?void 0:_e.toLowerCase().includes(a))||((ue=s.paid)==null?void 0:ue.toLowerCase().includes(a))||((xe=(ve=s.vehicle)==null?void 0:ve.driver_name)==null?void 0:xe.toLowerCase().includes(a))||((fe=(je=s.vehicle)==null?void 0:je.vehicle_plate_no)==null?void 0:fe.toLowerCase().includes(a))||((be=(ye=s.vehicle)==null?void 0:ye.name)==null?void 0:be.toLowerCase().includes(a))||((Ne=(Ce=s.vehicle)==null?void 0:Ce.plate_no)==null?void 0:Ne.toLowerCase().includes(a))||((Se=y(s.warehouse_id))==null?void 0:Se.toLowerCase().includes(a))}),se=C*N,i=se-N,p=k.slice(i,se),_=Math.ceil(k.length/N),f=s=>s?new Date(s).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"N/A",u=s=>{switch(s==null?void 0:s.toLowerCase()){case"pending":return"warning";case"dispatching":return"info";case"completed":return"success";case"unpaid":return"danger";case"paid":return"success";case"void":return"secondary";default:return"primary"}},v=s=>{try{const a=g.find(h=>h.tracking_id===s);De(a),b(!0)}catch{n("Error viewing shipment details")}};t.useEffect(()=>{l()},[]);const z=s=>{var A,V,me,_e,ue,ve,xe,je,fe,ye,be,Ce,Ne,Se,Pe,Te,Fe,$e,Re,Me,Ve,We,He,Be,Oe,qe,ze,Ue,Ge,Ke,Ye,Qe,Je,Xe,Ze,es,ss,is,as,ns,ts,rs;const a=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),h=ls=>new Intl.NumberFormat("en-US",{style:"currency",currency:"PHP"}).format(ls),m=((A=s.shipping)==null?void 0:A.shipping_type)==="air"?`
    <div class="section">
      <div class="section-title">AIR FREIGHT DETAILS</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Destination Airport:</span>
          <span class="value">${((me=(V=s.shipping)==null?void 0:V.shipping_details)==null?void 0:me.destination_airport)||"N/A"}</span>
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
    `},U=s=>{const a=z(s),h=window.open("","_blank");h.document.write(a),h.document.close(),h.print()},R=({icon:s})=>{const[a,h]=t.useState(!1);return e.jsx(W,{icon:s,bounce:a,onMouseEnter:()=>h(!0),onMouseLeave:()=>h(!1)})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mb-3",children:e.jsxs("div",{className:"row align-items-center",children:[e.jsx("div",{className:"col-md-6",children:e.jsx(E,{type:"text",className:"mb-2",id:"searchInput9",placeholder:"Search shipments...",value:K,onChange:s=>X(s.target.value)})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"text-end",children:e.jsxs("span",{className:"text-muted",children:["Total Records:"," ",k.filter(s=>s.isInWarehouse).length]})})})]})}),Array.isArray(g)&&g.length>0?e.jsxs(e.Fragment,{children:[e.jsxs(ai,{hover:!0,responsive:!0,children:[e.jsx(ni,{className:"text-center",children:e.jsxs(Ls,{children:[e.jsx(Q,{children:"Tracking ID"}),e.jsx(Q,{children:"Status"}),e.jsx(Q,{children:"Shipper"}),e.jsx(Q,{children:"Consignee"}),e.jsx(Q,{children:"Consignee Address"}),e.jsx(Q,{children:"Vehicle"}),e.jsx(Q,{children:"Driver"}),e.jsx(Q,{children:"Storage Warehouse"}),e.jsx(Q,{children:"Actions"})]})}),e.jsx(ti,{className:"text-center",children:p.filter(s=>s.isInWarehouse).map(s=>{var a,h,m,x,A,V;return e.jsxs(Ls,{children:[e.jsx(J,{children:s.tracking_id}),e.jsx(J,{children:e.jsx(Ie,{color:u(s.dispatch),children:s.dispatch||"N/A"})}),e.jsx(J,{children:((a=s.shipper)==null?void 0:a.shipper_company_name)||"N/A"}),e.jsx(J,{children:((h=s.consignee)==null?void 0:h.consignee_company_name)||"N/A"}),e.jsx(J,{children:((m=s.consignee)==null?void 0:m.consignee_company_address)||"N/A"}),e.jsx(J,{children:(x=s.vehicle)!=null&&x.name&&((A=s.vehicle)!=null&&A.plate_no)?e.jsxs(Ie,{color:"info",children:[s.vehicle.name," (",s.vehicle.plate_no,")"]}):e.jsx(Ie,{color:"secondary",children:"N/A"})}),e.jsx(J,{children:(V=s.vehicle)!=null&&V.driver_name?e.jsx(Ie,{color:"info",children:s.vehicle.driver_name}):e.jsx(Ie,{color:"secondary",children:"N/A"})}),e.jsx(J,{children:s.warehouse_id?e.jsx(Ie,{color:"success",children:y(s.warehouse_id)}):e.jsx(Ie,{color:"secondary",children:"N/A"})}),e.jsx(J,{children:e.jsxs(ri,{children:[e.jsx(li,{color:"secondary",size:"sm",children:"Actions"}),e.jsx(ci,{children:e.jsxs(I,{children:[e.jsxs(T,{color:"info",variant:"outline",className:"mb-3",onClick:()=>v(s.tracking_id),children:[e.jsx(R,{icon:zs})," View"]}),e.jsxs(T,{color:"secondary",variant:"outline",className:"mb-3",onClick:()=>U(s),disabled:S||!s.vehicle.name,children:[e.jsx(R,{icon:Us})," Print"]}),e.jsx(ui,{shipment:s,onSuccess:l}),e.jsx(vi,{shipment:s,onSuccess:l})]})})]})})]},s.tracking_id)})})]}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-3",children:[e.jsx("div",{children:e.jsxs("span",{className:"text-muted",children:["Showing ",i+1," to"," ",Math.min(se,k.filter(s=>s.isInWarehouse).length)," ","of ",k.filter(s=>s.isInWarehouse).length," entries"]})}),e.jsxs(Ws,{"aria-label":"Page navigation",children:[e.jsx(ke,{"aria-label":"Previous",disabled:C===1,onClick:()=>q(C-1),children:e.jsx("span",{"aria-hidden":"true",children:"Previous"})}),[...Array(_)].map((s,a)=>e.jsx(ke,{active:C===a+1,onClick:()=>q(a+1),children:a+1},a+1)),e.jsx(ke,{"aria-label":"Next",disabled:C===_,onClick:()=>q(C+1),children:e.jsx("span",{"aria-hidden":"true",children:"Next"})})]})]})]}):e.jsx(Hs,{color:"success",className:"text-center p-4",children:"No shipment records found"}),e.jsxs(ds,{visible:j,onClose:()=>b(!1),size:"lg",children:[e.jsx(os,{closeButton:!0,children:e.jsx("h5",{children:"Shipment Details"})}),e.jsx(ps,{children:o&&e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Basic Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tracking ID:"})," ",o.tracking_id]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dispatch Status:"})," ",o.dispatch]})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Shipping Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Country:"})," ",o.country]})]})]}),e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Shipper Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(M=o.shipper)==null?void 0:M.shipper_company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(ie=o.shipper)==null?void 0:ie.shipper_contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(ae=o.shipper)==null?void 0:ae.shipper_contact_email_address]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(ne=o.shipper)==null?void 0:ne.shipper_contact_phone_number]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(te=o.shipper)==null?void 0:te.shipper_company_address]})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Consignee Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(re=o.consignee)==null?void 0:re.consignee_company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(le=o.consignee)==null?void 0:le.consignee_contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(ce=o.consignee)==null?void 0:ce.consignee_contact_email_address]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(de=o.consignee)==null?void 0:de.consignee_contact_phone_number]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(oe=o.consignee)==null?void 0:oe.consignee_company_address]})]})]}),e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-12",children:[e.jsx("h6",{children:"Shipment Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Description:"})," ",(pe=o.shipment)==null?void 0:pe.shipment_description]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Weight:"})," ",(he=o.shipment)==null?void 0:he.shipment_weight," kg"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dimensions:"})," ",(ge=o.shipment)==null?void 0:ge.shipment_dimension_length," x"," ",(P=o.shipment)==null?void 0:P.shipment_dimension_width," x"," ",(Le=o.shipment)==null?void 0:Le.shipment_dimension_height," cm"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Volume:"})," ",(r=o.shipment)==null?void 0:r.shipment_volume," m³"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Value:"})," ",(Y=o.shipment)==null?void 0:Y.shipment_value]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Instructions:"})," ",(Ae=o.shipment)==null?void 0:Ae.shipment_instructions]})]})})]})}),e.jsx(hs,{children:e.jsx(T,{color:"secondary",variant:"outline",onClick:()=>b(!1),children:"Close"})})]})]})},ji=()=>{const{showSuccess:g,showError:w}=cs(),[S,F]=t.useState([]),[H,L]=t.useState([]),[B,G]=t.useState(!0),[K,X]=t.useState(null),[D,$]=t.useState(null),[n,Z]=t.useState(""),o="http://localhost:5057/",[De,j]=t.useState(!1),[b,Ee]=t.useState(1),[O]=t.useState(10),C=i=>{if(i.photo){const p=`${o}uploads/dispatchReceipts/${i.photo}`;$(p),j(!0)}else w("No receipt image available")};t.useEffect(()=>{q()},[]);const q=async()=>{var i,p,_,f;try{G(!0);const u=await we.get("/api/v1/dispatch/all");F(u.data.data)}catch(u){X(((p=(i=u==null?void 0:u.response)==null?void 0:i.data)==null?void 0:p.message)||"Error fetching data"),w(((f=(_=u==null?void 0:u.response)==null?void 0:_.data)==null?void 0:f.message)||"Error fetching receiving history")}finally{G(!1)}};t.useEffect(()=>{(async()=>{var p,_,f,u;try{const v=await we.get("/api/v1/warehouseLoc/locations");v.data.data&&L(v.data.data)}catch(v){X((_=(p=v==null?void 0:v.response)==null?void 0:p.data)==null?void 0:_.message),w(((u=(f=v==null?void 0:v.response)==null?void 0:f.data)==null?void 0:u.message)||"Error fetching warehouses")}})()},[]);const N=i=>{if(!H.length)return"Loading...";const p=H.find(_=>_._id===i);return p?p.warehouseName:"N/A"},c=S.filter(i=>{var _,f,u,v,z,U,R,M;const p=n.toLowerCase();return((_=i.shipment.tracking_id)==null?void 0:_.toLowerCase().includes(p))||((u=(f=i.shipper)==null?void 0:f.company_name)==null?void 0:u.toLowerCase().includes(p))||((z=(v=i.consignee)==null?void 0:v.company_name)==null?void 0:z.toLowerCase().includes(p))||((R=(U=i.vehicle)==null?void 0:U.name)==null?void 0:R.toLowerCase().includes(p))||((M=i.receiveBy)==null?void 0:M.toLowerCase().includes(p))}),d=b*O,l=d-O,y=c.slice(l,d),ee=Math.ceil(c.length/O),k=i=>{Ee(i)};if(B)return e.jsx("div",{className:"text-center py-5",children:"Loading..."});const se=({icon:i})=>{const[p,_]=t.useState(!1);return e.jsx(W,{icon:i,bounce:p,onMouseEnter:()=>_(!0),onMouseLeave:()=>_(!1)})};return e.jsxs("div",{className:"container-fluid px-4",children:[e.jsx("h1",{className:"mt-4",children:"Receiving History"}),e.jsx("div",{className:"mb-4",children:e.jsxs("div",{className:"input-group",children:[e.jsx("span",{className:"input-group-text",children:e.jsx(W,{icon:Gs})}),e.jsx(E,{placeholder:"Search by tracking ID, company, receiver...",value:n,id:"searchInput",onChange:i=>Z(i.target.value)})]})}),e.jsx("div",{children:e.jsxs("div",{children:[e.jsx(oi,{children:y.map((i,p)=>{var _,f,u,v,z,U,R,M,ie,ae,ne,te,re,le,ce,de,oe,pe,he,ge,P,Le,r,Y,Ae,s,a,h,m,x,A,V,me,_e,ue,ve,xe,je,fe,ye,be,Ce,Ne,Se,Pe,Te,Fe,$e,Re,Me,Ve,We,He,Be,Oe,qe,ze,Ue,Ge,Ke,Ye,Qe,Je,Xe,Ze,es,ss,is,as,ns,ts,rs,ls,gs,ms,_s,us,vs,xs,js,fs,ys,bs,Cs,Ns,Ss,ws,Ds,As;return e.jsxs(pi,{children:[e.jsx(hi,{children:e.jsxs("div",{className:"d-flex justify-content-between w-100 me-3",children:[e.jsxs("span",{children:[e.jsx(W,{icon:Ks,className:"me-2"}),"Tracking ID: ",(_=i.shipment)==null?void 0:_.tracking_id]}),e.jsxs("span",{children:["Dispatch Date ",new Date(i.receiveDate).toLocaleDateString()]})]})}),e.jsxs(gi,{children:[e.jsxs("div",{className:"row g-3 mb-3  justify-content-between",children:[e.jsx("div",{className:"col-md-3",children:e.jsxs(I,{children:[e.jsxs(I,{className:"me-2 mb-3",children:[e.jsx(W,{icon:Is,className:"me-2"}),e.jsx("strong",{children:"Shipping Details"})]}),e.jsxs(I,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Shipping Type:"})," ",(f=i.shipping)==null?void 0:f.shipping_type]}),e.jsx("p",{children:((v=(u=i.shipping)==null?void 0:u.shipping_details)==null?void 0:v.destination_address)!=null&&((U=(z=i.shipping)==null?void 0:z.shipping_details)==null?void 0:U.destination_address)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Destination Address:"})," ",(M=(R=i.shipping)==null?void 0:R.shipping_details)==null?void 0:M.destination_address]})}),e.jsx("p",{children:((ae=(ie=i.shipping)==null?void 0:ie.shipping_details)==null?void 0:ae.loading_port)!=null&&((te=(ne=i.shipping)==null?void 0:ne.shipping_details)==null?void 0:te.loading_port)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Loading Port:"})," ",(le=(re=i.shipping)==null?void 0:re.shipping_details)==null?void 0:le.loading_port]})}),e.jsx("p",{children:((de=(ce=i.shipping)==null?void 0:ce.shipping_details)==null?void 0:de.discharge_port)!=null&&((pe=(oe=i.shipping)==null?void 0:oe.shipping_details)==null?void 0:pe.discharge_port)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Discharge Port:"})," ",(ge=(he=i.shipping)==null?void 0:he.shipping_details)==null?void 0:ge.discharge_port]})}),e.jsx("p",{children:((Le=(P=i.shipping)==null?void 0:P.shipping_details)==null?void 0:Le.sailing_date)!=null&&((Y=(r=i.shipping)==null?void 0:r.shipping_details)==null?void 0:Y.sailing_date)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Sailing Date:"})," ",new Date((s=(Ae=i.shipping)==null?void 0:Ae.shipping_details)==null?void 0:s.sailing_date).toLocaleDateString()]})}),e.jsx("p",{children:((h=(a=i.shipping)==null?void 0:a.shipping_details)==null?void 0:h.estimated_arrival_date)!=null&&((x=(m=i.shipping)==null?void 0:m.shipping_details)==null?void 0:x.estimated_arrival_date)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Estimated Arrival Date:"})," ",new Date((V=(A=i.shipping)==null?void 0:A.shipping_details)==null?void 0:V.estimated_arrival_date).toLocaleDateString()]})}),e.jsx("p",{children:((_e=(me=i.shipping)==null?void 0:me.shipping_details)==null?void 0:_e.cargo_type)!=null&&((ve=(ue=i.shipping)==null?void 0:ue.shipping_details)==null?void 0:ve.cargo_type)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Cargo Type:"})," ",(je=(xe=i.shipping)==null?void 0:xe.shipping_details)==null?void 0:je.cargo_type]})}),e.jsx("p",{children:((ye=(fe=i.shipping)==null?void 0:fe.shipping_details)==null?void 0:ye.destination_airport)!=null&&((Ce=(be=i.shipping)==null?void 0:be.shipping_details)==null?void 0:Ce.destination_airport)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Destination airport:"})," ",(Se=(Ne=i.shipping)==null?void 0:Ne.shipping_details)==null?void 0:Se.destination_airport]})}),e.jsx("p",{children:((Te=(Pe=i.shipping)==null?void 0:Pe.shipping_details)==null?void 0:Te.delivery_date)!=null&&(($e=(Fe=i.shipping)==null?void 0:Fe.shipping_details)==null?void 0:$e.delivery_date)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Delivery Date:"})," ",new Date((Me=(Re=i.shipping)==null?void 0:Re.shipping_details)==null?void 0:Me.delivery_date).toLocaleDateString()]})}),e.jsx("p",{children:((We=(Ve=i.shipping)==null?void 0:Ve.shipping_details)==null?void 0:We.flight_type)!=null&&((Be=(He=i.shipping)==null?void 0:He.shipping_details)==null?void 0:Be.flight_type)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Flight Details:"})," ",(qe=(Oe=i.shipping)==null?void 0:Oe.shipping_details)==null?void 0:qe.flight_type]})}),e.jsx("p",{children:((Ue=(ze=i.shipping)==null?void 0:ze.shipping_details)==null?void 0:Ue.preferred_arrival_date)!=null&&((Ke=(Ge=i.shipping)==null?void 0:Ge.shipping_details)==null?void 0:Ke.preferred_arrival_date)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Arrival Date:"})," ",new Date((Qe=(Ye=i.shipping)==null?void 0:Ye.shipping_details)==null?void 0:Qe.preferred_arrival_date).toLocaleDateString()]})}),e.jsx("p",{children:((Xe=(Je=i.shipping)==null?void 0:Je.shipping_details)==null?void 0:Xe.preferred_departure_date)!=null&&((es=(Ze=i.shipping)==null?void 0:Ze.shipping_details)==null?void 0:es.flight_type)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Departure Date:"})," ",new Date((is=(ss=i.shipping)==null?void 0:ss.shipping_details)==null?void 0:is.preferred_departure_date).toLocaleDateString()]})})]})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs(I,{children:[e.jsxs(I,{className:" mb-3",children:[e.jsx(W,{icon:Ys,className:"me-2"}),e.jsx("strong",{children:"Shipper Information"})]}),e.jsxs(I,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(as=i.shipper)==null?void 0:as.company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(ns=i.shipper)==null?void 0:ns.contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(ts=i.shipper)==null?void 0:ts.email]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(rs=i.shipper)==null?void 0:rs.phone]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(ls=i.shipper)==null?void 0:ls.address]})]})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs(I,{children:[e.jsxs(I,{className:"me-2 mb-3",children:[e.jsx(W,{icon:Qs,className:"me-2"}),e.jsx("strong",{children:"Consignee Information"})]}),e.jsxs(I,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(gs=i.consignee)==null?void 0:gs.company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(ms=i.consignee)==null?void 0:ms.contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(_s=i.consignee)==null?void 0:_s.email]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(us=i.consignee)==null?void 0:us.phone]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(vs=i.consignee)==null?void 0:vs.address]})]})]})}),e.jsx(I,{className:"col-md-6",children:e.jsxs(ks,{children:[e.jsxs(Ps,{children:[e.jsx(W,{icon:Is,className:"me-2"}),"Shipment Details"]}),e.jsxs(Ts,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Description:"})," ",(xs=i.shipment)==null?void 0:xs.description]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Weight:"})," ",(js=i.shipment)==null?void 0:js.weight," kg"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dimensions:"})," ",(ys=(fs=i.shipment)==null?void 0:fs.dimension)==null?void 0:ys.length," x"," ",(Cs=(bs=i.shipment)==null?void 0:bs.dimension)==null?void 0:Cs.width," x ",(Ss=(Ns=i.shipment)==null?void 0:Ns.dimension)==null?void 0:Ss.height," ","cm"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Warehouse:"})," ",N(i.warehouse_id)]})]})]})}),e.jsx(I,{className:"col-md-6",children:e.jsxs(ks,{children:[e.jsxs(Ps,{children:[e.jsx(W,{icon:Js,className:"me-2"}),"Vehicle use to transport"]}),e.jsxs(Ts,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Vehicle:"})," ",(ws=i.vehicle)==null?void 0:ws.name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Plate No:"})," ",(Ds=i.vehicle)==null?void 0:Ds.plate_no]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Driver:"})," ",(As=i.vehicle)==null?void 0:As.driver_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dispatch By:"})," ",i.receiveBy]})]})]})})]}),e.jsx("div",{className:"text-center mt-3",children:e.jsxs(T,{color:"primary",className:"me-2",variant:"outline",onClick:()=>C(i),children:[e.jsx(se,{icon:Xs,className:"me-2"}),"Photo"]})})]})]},i._id||p)})}),c.length>O&&e.jsxs(Ws,{className:"mt-4 justify-content-center","aria-label":"Page navigation",children:[e.jsx(ke,{onClick:()=>k(b-1),disabled:b===1,children:"Previous"}),[...Array(ee)].map((i,p)=>e.jsx(ke,{active:b===p+1,onClick:()=>k(p+1),children:p+1},p+1)),e.jsx(ke,{onClick:()=>k(b+1),disabled:b===ee,children:"Next"})]})]})}),e.jsx(I,{className:"text-center",children:e.jsxs(ds,{visible:De,onClose:()=>{j(!1),$(null)},size:"lg",alignment:"center",children:[e.jsx(os,{closeButton:!0,children:"Receipt Image"}),e.jsx(ps,{className:"text-center",children:D&&e.jsx(Vs,{src:D,alt:"Receipt",style:{maxWidth:"100%",maxHeight:"70vh",objectFit:"contain"},onError:i=>{w("Error loading image"),i.target.src="placeholder-image-url.jpg"}})}),e.jsxs(hs,{children:[e.jsx(T,{color:"secondary",variant:"outline",onClick:()=>{j(!1),$(null)},children:"Close"}),e.jsx("a",{href:D,target:"_blank",rel:"noopener noreferrer",children:e.jsx(T,{color:"primary",variant:"outline",children:"Open in New Tab"})})]})]})}),K&&e.jsx(Hs,{color:"danger",children:K})]})},Oi=()=>{const[g,w]=t.useState(0),S=()=>{w(F=>F+1)};return e.jsxs(e.Fragment,{children:[e.jsx("h1",{children:"Dispatching Items"}),e.jsxs(mi,{activeItemKey:"Dispatching",children:[e.jsxs(_i,{variant:"tabs",children:[e.jsx(Fs,{itemKey:"Dispatching",children:"Dispatching"}),e.jsx(Fs,{itemKey:"Dispatching History",children:"Dispatching History"})]}),e.jsxs(di,{children:[e.jsx($s,{className:"p-3",itemKey:"Dispatching",children:e.jsx(xi,{onSuccess:S})}),e.jsx($s,{className:"p-3",itemKey:"Dispatching History",children:e.jsx(ji,{onSuccess:S})})]})]})]})};export{Oi as default};
