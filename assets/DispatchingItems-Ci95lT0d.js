import{l as cs,r,n as U,j as e,k as Rs,F as Hs,E as Bs}from"./index-DZGJCuOe.js";import{E as Os,F as R,w as qs,a as ge,x as zs,y as Us,k as Gs,z as Ks,B as Is,A as Ys,b as Qs,f as Js,D as Xs}from"./index-DIgmdPjR.js";import{a as P}from"./CButton-BnfWto-e.js";import{C as ds,a as os,b as ps,c as hs}from"./CModalHeader-B0xpTHco.js";import{C as Zs}from"./CForm-L-fC1ShP.js";import{C as Es}from"./CFormSelect-Cb6rNLBt.js";import{C as L,a as ei}from"./CFormInput-EZtn8AIz.js";import{C as si}from"./CFormTextarea-5qM8rY_Y.js";import{C as ii}from"./CInputGroup-tUN_7Qvq.js";import{C as Ms}from"./1-tsU9Z8VM.js";import{C as ai,a as ni,b as Ls,c as q,d as ti,e as z}from"./CTable-mcEyLhtI.js";import{b as ri,c as li,d as ci,a as di}from"./DefaultLayout-DHRMbFo0.js";import{C as E}from"./CContainer-B22YzjYV.js";import{C as Vs,a as _e}from"./CPaginationItem-CvIbgu0h.js";import{C as Ws}from"./CAlert-i-kAMGLS.js";import{C as oi,a as pi,b as hi,c as gi}from"./CAccordionHeader-Cfk_IHyc.js";import{C as ks}from"./CCard-BTZAUdul.js";import{C as Ps}from"./CCardHeader-Crl9UWRm.js";import{C as Ts}from"./CCardBody-O0UQ9Rlq.js";import{C as mi,a as _i,b as Fs,c as $s}from"./CTabList-p-cg4h3o.js";import"./index.esm-3_8T6ype.js";import"./cil-user-Ddrdy7PS.js";import"./getTransitionDurationFromElement-Cpu4p4hx.js";const ui=({shipment:g={},onSuccess:w=()=>{}})=>{const{showSuccess:S,showError:T}=cs(),[M,k]=r.useState(!1),[V,B]=r.useState(!1),[O,G]=r.useState([]),[D,F]=r.useState(""),[a,K]=r.useState({dispatch:"Dispatching",shipping:{shipping_type:"",shipping_details:{destination_address:"",pickup_date:"",delivery_date:"",vehicle_type:"",destination_airport:"",preferred_departure_date:"",preferred_arrival_date:"",flight_type:"",loading_port:"",discharge_port:"",sailing_date:"",estimated_arrival_date:"",cargo_type:""}},vehicle:{name:"",plate_no:"",driver_name:""}});r.useEffect(()=>{M&&o()},[M]);const o=async()=>{try{const d=(await U.get("api/v1/vehicle")).data.data.filter(n=>n.status==="in_use");G(d)}catch{T("Error fetching vehicles")}},de=c=>{const d=c.target.value;K(n=>({...n,shipping:{...n.shipping,shipping_type:d,shipping_details:{destination_address:"",pickup_date:"",delivery_date:"",vehicle_type:"",destination_airport:"",preferred_departure_date:"",preferred_arrival_date:"",flight_type:"",loading_port:"",discharge_port:"",sailing_date:"",estimated_arrival_date:"",cargo_type:""}}})),F("")},u=c=>{const{id:d,value:n}=c.target;K(N=>({...N,shipping:{...N.shipping,shipping_details:{...N.shipping.shipping_details,[d]:n}}}))},f=c=>{const d=O.find(n=>n._id===c.target.value);d&&(F(c.target.value),K(n=>{var N;return{...n,vehicle:{name:d.brand||"",plate_no:d.regisNumber||"",driver_name:((N=d.assignedDriver)==null?void 0:N.driverName)||""},shipping:{...n.shipping,shipping_details:{...n.shipping.shipping_details,vehicle_type:d.brand||""}}}}))},me=async()=>{var c,d;B(!0);try{let n={};a.shipping.shipping_type==="land"?n={delivery_date:a.shipping.shipping_details.delivery_date,vehicle_type:a.vehicle.plate_no}:a.shipping.shipping_type==="air"?n={destination_airport:a.shipping.shipping_details.destination_airport,preferred_departure_date:a.shipping.shipping_details.preferred_departure_date,preferred_arrival_date:a.shipping.shipping_details.preferred_arrival_date,flight_type:a.shipping.shipping_details.flight_type,vehicle_type:a.vehicle.plate_no}:a.shipping.shipping_type==="sea"&&(n={destination_address:a.shipping.shipping_details.destination_address,loading_port:a.shipping.shipping_details.loading_port,discharge_port:a.shipping.shipping_details.discharge_port,sailing_date:a.shipping.shipping_details.sailing_date,estimated_arrival_date:a.shipping.shipping_details.estimated_arrival_date,cargo_type:a.shipping.shipping_details.cargo_type,vehicle_type:a.vehicle.plate_no});const N={dispatch:a.dispatch,shipping:{shipping_type:a.shipping.shipping_type,shipping_details:n},vehicle:a.vehicle};(await Hs.put(`https://backend-log2.axleshift.com/api/v1/shipment/${g._id}`,N)).data.success&&(S("Shipment dispatched successfully"),k(!1),w())}catch(n){T(((d=(c=n.response)==null?void 0:c.data)==null?void 0:d.message)||"Error updating shipment")}finally{B(!1)}},W=()=>{K({dispatch:"Dispatching",shipping:{shipping_type:"",shipping_details:{destination_address:"",pickup_date:"",delivery_date:"",vehicle_type:"",destination_airport:"",preferred_departure_date:"",preferred_arrival_date:"",flight_type:"",loading_port:"",discharge_port:"",sailing_date:"",estimated_arrival_date:"",cargo_type:""}},vehicle:{name:"",plate_no:"",driver_name:""}}),F("")},y=new Date,H=()=>e.jsxs(Es,{className:"mb-3",label:"Select Vehicle *",value:D,onChange:f,children:[e.jsx("option",{value:"",children:"Choose a vehicle"}),O.map(c=>e.jsxs("option",{value:c._id,children:[c.brand," - ",c.regisNumber," ",c.assignedDriver?`(Driver: ${c.assignedDriver.driverName})`:"(No Driver)"]},c._id))]}),C=({icon:c})=>{const[d,n]=r.useState(!1);return e.jsx(R,{icon:c,bounce:d,onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs(P,{color:"primary",variant:"outline",className:"mb-3",onClick:()=>k(!M),children:[e.jsx(C,{icon:Os})," Dispatch"]}),e.jsxs(ds,{visible:M,onClose:()=>{k(!1),W()},size:"lg",children:[e.jsx(os,{children:"Dispatch Shipment"}),e.jsx(ps,{children:e.jsxs(Zs,{children:[e.jsxs(Es,{className:"mb-3",value:a.shipping.shipping_type||"",onChange:de,label:"Shipping Type *",required:!0,children:[e.jsx("option",{value:"",children:"Select shipping type"}),e.jsx("option",{value:"land",children:"Land"}),e.jsx("option",{value:"air",children:"Air"}),e.jsx("option",{value:"sea",children:"Sea"})]}),a.shipping.shipping_type&&e.jsx(H,{}),a.shipping.shipping_type==="land"&&e.jsx("div",{className:"mb-3",children:e.jsx(L,{className:"mb-3",type:"datetime-local",id:"delivery_date",label:"Delivery Date *",min:y.toISOString().slice(0,16),value:a.shipping.shipping_details.delivery_date||"",onChange:u,required:!0})}),a.shipping.shipping_type==="air"&&e.jsxs("div",{className:"mb-3",children:[e.jsx(L,{className:"mb-3",type:"text",id:"destination_airport",label:"Destination Airport *",value:a.shipping.shipping_details.destination_airport||"",onChange:u,required:!0}),e.jsx(L,{className:"mb-3",type:"datetime-local",id:"preferred_departure_date",label:"Preferred Departure Date *",min:y.toISOString().slice(0,16),value:a.shipping.shipping_details.preferred_departure_date||"",onChange:u,required:!0}),e.jsx(L,{className:"mb-3",type:"datetime-local",id:"preferred_arrival_date",label:"Preferred Arrival Date *",min:y.toISOString().slice(0,16),value:a.shipping.shipping_details.preferred_arrival_date||"",onChange:u,required:!0}),e.jsx(si,{className:"mb-3",type:"text",id:"flight_type",label:"Flight Details *",placeholder:"Flight Number, Airline, etc.",value:a.shipping.shipping_details.flight_type||"",onChange:u,required:!0})]}),a.shipping.shipping_type==="sea"&&e.jsxs("div",{className:"mb-3",children:[e.jsx(L,{className:"mb-3",type:"text",id:"loading_port",label:"Loading Port *",value:a.shipping.shipping_details.loading_port||"",onChange:u,required:!0}),e.jsx(L,{className:"mb-3",type:"text",id:"destination_address",label:"Vessle Name *",value:a.shipping.shipping_details.destination_address||"",onChange:u,required:!0}),e.jsx(L,{className:"mb-3",type:"text",id:"discharge_port",label:"Discharge Port *",value:a.shipping.shipping_details.discharge_port||"",onChange:u,required:!0}),e.jsx(L,{className:"mb-3",type:"datetime-local",id:"sailing_date",label:"Sailing Date *",min:y.toISOString().slice(0,16),value:a.shipping.shipping_details.sailing_date||"",onChange:u,required:!0}),e.jsx(L,{className:"mb-3",type:"datetime-local",id:"estimated_arrival_date",label:"Estimated Arrival Date *",min:y.toISOString().slice(0,16),value:a.shipping.shipping_details.estimated_arrival_date||"",onChange:u,required:!0}),e.jsx(L,{className:"mb-3",type:"text",id:"cargo_type",label:"Cargo Type *",value:a.shipping.shipping_details.cargo_type||"",onChange:u,required:!0})]})]})}),e.jsxs(hs,{children:[e.jsx(P,{color:"secondary",onClick:()=>{k(!1),W()},children:"Cancel"}),e.jsx(P,{color:"primary",onClick:me,disabled:V,children:V?e.jsx(Rs,{size:"sm"}):"Dispatch Shipment"})]})]})]})},vi=({shipment:g={},onSuccess:w=()=>{}})=>{var H;const{showError:S,showSuccess:T}=cs(),[M,k]=r.useState(!1),[V,B]=r.useState(!1),[O,G]=r.useState([]),[D,F]=r.useState(null),[a,K]=r.useState(null),[o,de]=r.useState(null),u=()=>{k(!0)},f=()=>{k(!1)},me=C=>{const c=C.target.files[0];if(c){if(!c.type.match("image.*")){S("Please select an image file");return}F(c);const d=new FileReader;d.onloadend=()=>{de(d.result)},d.readAsDataURL(c)}};r.useEffect(()=>{(async()=>{var c,d;try{const n=await U.get("/api/v1/warehouseLoc/locations");n.data.data&&G(n.data.data)}catch(n){setLocalError((c=n==null?void 0:n.response)==null?void 0:c.data.message),S(((d=n==null?void 0:n.response)==null?void 0:d.data.message)||"Error fetching warehouses")}})()},[]);const W=async()=>{var C,c,d;if(!(g!=null&&g._id)){S("Invalid shipment data");return}B(!0);try{const n=Bs(),l=(await U.get(`https://backend-log2.axleshift.com/api/v1/shipment/${g._id}`)).data.shipment,A=new FormData;if(D&&A.append("photo",D),!((C=l.shipping)!=null&&C.shipping_type)){S("Shipping type is required");return}const oe={shipper:{company_name:l.shipper.shipper_company_name,contact_name:l.shipper.shipper_contact_name,email:l.shipper.shipper_contact_email_address,phone:l.shipper.shipper_contact_phone_number,address:l.shipper.shipper_company_address},consignee:{company_name:l.consignee.consignee_company_name,contact_name:l.consignee.consignee_contact_name,email:l.consignee.consignee_contact_email_address,phone:l.consignee.consignee_contact_phone_number,address:l.consignee.consignee_company_address},shipment:{description:l.shipment.shipment_description,weight:l.shipment.shipment_weight,dimension:{length:l.shipment.shipment_dimension_length,width:l.shipment.shipment_dimension_width,height:l.shipment.shipment_dimension_height},tracking_id:l.tracking_id,isInWarehouse:!1},vehicle:{name:l.vehicle.name,plate_no:l.vehicle.plate_no,driver_name:l.vehicle.driver_name},warehouse_id:l.warehouse_id,shipping:{shipping_type:l.shipping.shipping_type,shipping_details:{destination_address:l.shipping.shipping_details.destination_address,pickup_date:l.shipping.shipping_details.pickup_date,delivery_date:l.shipping.shipping_details.delivery_date,vehicle_type:l.shipping.shipping_details.vehicle_type,destination_airport:l.shipping.shipping_details.destination_airport,preferred_departure_date:l.shipping.shipping_details.preferred_departure_date,preferred_arrival_date:l.shipping.shipping_details.preferred_arrival_date,flight_type:l.shipping.shipping_details.flight_type,loading_port:l.shipping.shipping_details.loading_port,discharge_port:l.shipping.shipping_details.discharge_port,sailing_date:l.shipping.shipping_details.sailing_date,estimated_arrival_date:l.shipping.shipping_details.estimated_arrival_date,cargo_type:l.shipping.shipping_details.cargo_type}},tracking_id:l.tracking_id,receiveDate:new Date().toISOString(),receiveBy:n};A.append("data",JSON.stringify(oe));const i=await U.post("api/v1/dispatch/add",A,{headers:{"Content-Type":"multipart/form-data"}}),p=await U.put(`https://backend-log2.axleshift.com/api/v1/shipment/${g._id}`,{isInWarehouse:!1,dispatch:"Completed"});i.status===201&&p.status===200&&(T("Shipment completed and copied to receiving successfully"),f(),w&&w())}catch(n){S(((d=(c=n==null?void 0:n.response)==null?void 0:c.data)==null?void 0:d.message)||"Error completing shipment")}finally{B(!1)}};if((g==null?void 0:g.paid)==="Paid")return null;const y=({icon:C})=>{const[c,d]=r.useState(!1);return e.jsx(R,{icon:C,bounce:c,onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs(P,{className:"mb-2",color:"success",variant:"outline",onClick:u,disabled:V||!((H=g==null?void 0:g.vehicle)!=null&&H.name),children:[e.jsx(y,{icon:qs})," Complete"]}),e.jsxs(ds,{visible:M,onClose:f,backdrop:"static",children:[e.jsx(os,{closeButton:!0,children:e.jsx("h5",{children:"Complete Shipment"})}),e.jsx(ps,{children:e.jsxs("div",{className:"mb-3",children:[e.jsx("h6",{children:"Shipment Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tracking ID:"})," ",g==null?void 0:g.tracking_id]}),e.jsx(ei,{htmlFor:"receipt",children:"Picture Of Receipts"}),e.jsx(ii,{className:"mb-3",children:e.jsx(L,{type:"file",id:"receipt",accept:"images/*",onChange:me})}),o&&e.jsx("div",{className:"mb-3",children:e.jsx(Ms,{src:o,rounded:!0,align:"center",alt:"Receipts",width:200,height:200})}),e.jsx("div",{className:"alert alert-info mt-3",children:e.jsxs("small",{children:[e.jsx("strong",{children:"Note:"})," This action will:",e.jsx("ul",{className:"mb-0",children:e.jsx("li",{children:" Complete the Dispatching"})})]})})]})}),e.jsxs(hs,{children:[e.jsx(P,{color:"secondary",variant:"outline",className:"mb-3",onClick:f,disabled:V,children:"Cancel"}),e.jsx(P,{className:"mb-3",color:"primary",variant:"outline",onClick:W,disabled:V||!o,children:V?e.jsxs(e.Fragment,{children:[e.jsx(Rs,{size:"sm",className:"me-2"}),"Completing..."]}):"Complete Shipment"})]})]})]})},xi=()=>{var Q,ue,ve,xe,je,fe,ye,be,Ce,Ne,Se,we,De,Ae,Ie,Ee,Le,ke;const[g,w]=r.useState([]),[S,T]=r.useState(!1),[M,k]=r.useState(null),[V,B]=r.useState([]),[O,G]=r.useState(""),[D,F]=r.useState([]),{showError:a,showSuccess:K}=cs(),[o,de]=r.useState(null),[u,f]=r.useState(!1),[me,W]=r.useState(!1),[y,H]=r.useState(1),[C]=r.useState(10),[c,d]=r.useState(!1),n=async()=>{var s,t,h,m;T(!0);try{const _=await U.get("https://backend-log2.axleshift.com/api/v1/shipment");if(_.status===200){const I=_.data.shipments||[];w(I),k(null)}}catch(_){k(((t=(s=_==null?void 0:_.response)==null?void 0:s.data)==null?void 0:t.message)||"Error fetching data"),a(((m=(h=_==null?void 0:_.response)==null?void 0:h.data)==null?void 0:m.message)||"Error fetching data")}finally{T(!1)}};r.useEffect(()=>{(async()=>{var t,h;try{const m=await U.get("/api/v1/warehouseLoc/locations");m.data.data&&F(m.data.data)}catch(m){setLocalError((t=m==null?void 0:m.response)==null?void 0:t.data.message),a(((h=m==null?void 0:m.response)==null?void 0:h.data.message)||"Error fetching warehouses")}})()},[]);const N=s=>{if(!D.length)return"Loading...";const t=D.find(h=>h._id===s);return t?t.warehouseName:"Not Yet Assigned"},l=s=>{if(!D.length)return"Loading...";const t=D.find(h=>h._id===s);return t?t.address:"Not Yet Assigned"},A=g.filter(s=>{var h,m,_,I,$,J,X,Z,ee,se,ie,ae,ne,te,re,le,ce;const t=O.toLowerCase();return((h=s.tracking_id)==null?void 0:h.toLowerCase().includes(t))||((_=(m=s.shipper)==null?void 0:m.shipper_company_name)==null?void 0:_.toLowerCase().includes(t))||(($=(I=s.consignee)==null?void 0:I.consignee_company_name)==null?void 0:$.toLowerCase().includes(t))||((J=s.type)==null?void 0:J.toLowerCase().includes(t))||((X=s.dispatch)==null?void 0:X.toLowerCase().includes(t))||((Z=s.paid)==null?void 0:Z.toLowerCase().includes(t))||((se=(ee=s.vehicle)==null?void 0:ee.driver_name)==null?void 0:se.toLowerCase().includes(t))||((ae=(ie=s.vehicle)==null?void 0:ie.vehicle_plate_no)==null?void 0:ae.toLowerCase().includes(t))||((te=(ne=s.vehicle)==null?void 0:ne.name)==null?void 0:te.toLowerCase().includes(t))||((le=(re=s.vehicle)==null?void 0:re.plate_no)==null?void 0:le.toLowerCase().includes(t))||((ce=N(s.warehouse_id))==null?void 0:ce.toLowerCase().includes(t))}),oe=y*C,i=oe-C,p=A.slice(i,oe),v=Math.ceil(A.length/C),b=s=>s?new Date(s).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"N/A",x=s=>{switch(s==null?void 0:s.toLowerCase()){case"pending":return"warning";case"dispatching":return"info";case"completed":return"success";case"unpaid":return"danger";case"paid":return"success";case"void":return"secondary";default:return"primary"}},j=s=>{try{const t=g.find(h=>h.tracking_id===s);de(t),f(!0)}catch{a("Error viewing shipment details")}};r.useEffect(()=>{n()},[]);const pe=s=>{var I,$,J,X,Z,ee,se,ie,ae,ne,te,re,le,ce,Pe,Te,Fe,$e,Re,Me,Ve,We,He,Be,Oe,qe,ze,Ue,Ge,Ke,Ye,Qe,Je,Xe,Ze,es,ss,is,as,ns,ts,rs;const t=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),h=ls=>new Intl.NumberFormat("en-US",{style:"currency",currency:"PHP"}).format(ls),m=((I=s.shipping)==null?void 0:I.shipping_type)==="air"?`
    <div class="section">
      <div class="section-title">AIR FREIGHT DETAILS</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Destination Airport:</span>
          <span class="value">${((J=($=s.shipping)==null?void 0:$.shipping_details)==null?void 0:J.destination_airport)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Flight Details:</span>
          <span class="value">${((Z=(X=s.shipping)==null?void 0:X.shipping_details)==null?void 0:Z.flight_type)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Preferred Departure:</span>
          <span class="value">${b((se=(ee=s.shipping)==null?void 0:ee.shipping_details)==null?void 0:se.preferred_departure_date)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Preferred Arrival:</span>
          <span class="value">${b((ae=(ie=s.shipping)==null?void 0:ie.shipping_details)==null?void 0:ae.preferred_arrival_date)||"N/A"}</span>
        </div>
      </div>
    </div>
  `:"",_=((ne=s.shipping)==null?void 0:ne.shipping_type)==="sea"?`
    <div class="section">
      <div class="section-title">SEA FREIGHT DETAILS</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Port of Loading:</span>
          <span class="value">${((re=(te=s.shipping)==null?void 0:te.shipping_details)==null?void 0:re.loading_port)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Port of Discharge:</span>
          <span class="value">${((ce=(le=s.shipping)==null?void 0:le.shipping_details)==null?void 0:ce.discharge_port)||"N/A"}</span>
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
          <span class="value">${b((Me=(Re=s.shipping)==null?void 0:Re.shipping_details)==null?void 0:Me.sailing_date)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Estimated Arrival:</span>
          <span class="value">${b((We=(Ve=s.shipping)==null?void 0:Ve.shipping_details)==null?void 0:We.estimated_arrival_date)||"N/A"}</span>
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
          <div>Date: ${t}</div>
        </div>
  
        <div class="section">
          <div class="section-title">Storage Details</div>
          <div class="info-grid">    
            <div class="info-item">
              <span class="label">Warehouse:</span>
              <span class="value">${N(s.warehouse_id)}</span>
            </div>
            <div class="info-item">
              <span class="label">Warehouse Address:</span>
              <span class="value">${l(s.warehouse_id)}</span>
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
              ${_}
              

  
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
    `},he=s=>{const t=pe(s),h=window.open("","_blank");h.document.write(t),h.document.close(),h.print()},Y=({icon:s})=>{const[t,h]=r.useState(!1);return e.jsx(R,{icon:s,bounce:t,onMouseEnter:()=>h(!0),onMouseLeave:()=>h(!1)})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mb-3",children:e.jsxs("div",{className:"row align-items-center",children:[e.jsx("div",{className:"col-md-6",children:e.jsx(L,{type:"text",className:"mb-2",id:"searchInput",placeholder:"Search shipments...",value:O,onChange:s=>G(s.target.value)})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"text-end",children:e.jsxs("span",{className:"text-muted",children:["Total Records:"," ",A.filter(s=>s.isInWarehouse).length]})})})]})}),Array.isArray(g)&&g.length>0?e.jsxs(e.Fragment,{children:[e.jsxs(ai,{hover:!0,responsive:!0,children:[e.jsx(ni,{className:"text-center",children:e.jsxs(Ls,{children:[e.jsx(q,{children:"Tracking ID"}),e.jsx(q,{children:"Status"}),e.jsx(q,{children:"Shipper"}),e.jsx(q,{children:"Consignee"}),e.jsx(q,{children:"Consignee Address"}),e.jsx(q,{children:"Vehicle"}),e.jsx(q,{children:"Driver"}),e.jsx(q,{children:"Storage Warehouse"}),e.jsx(q,{children:"Actions"})]})}),e.jsx(ti,{className:"text-center",children:p.filter(s=>s.isInWarehouse).map(s=>{var t,h,m,_,I,$;return e.jsxs(Ls,{children:[e.jsx(z,{children:s.tracking_id}),e.jsx(z,{children:e.jsx(ge,{color:x(s.dispatch),children:s.dispatch||"N/A"})}),e.jsx(z,{children:((t=s.shipper)==null?void 0:t.shipper_company_name)||"N/A"}),e.jsx(z,{children:((h=s.consignee)==null?void 0:h.consignee_company_name)||"N/A"}),e.jsx(z,{children:((m=s.consignee)==null?void 0:m.consignee_company_address)||"N/A"}),e.jsx(z,{children:(_=s.vehicle)!=null&&_.name&&((I=s.vehicle)!=null&&I.plate_no)?e.jsxs(ge,{color:"info",children:[s.vehicle.name," (",s.vehicle.plate_no,")"]}):e.jsx(ge,{color:"secondary",children:"N/A"})}),e.jsx(z,{children:($=s.vehicle)!=null&&$.driver_name?e.jsx(ge,{color:"info",children:s.vehicle.driver_name}):e.jsx(ge,{color:"secondary",children:"N/A"})}),e.jsx(z,{children:s.warehouse_id?e.jsx(ge,{color:"success",children:N(s.warehouse_id)}):e.jsx(ge,{color:"secondary",children:"N/A"})}),e.jsx(z,{children:e.jsxs(ri,{children:[e.jsx(li,{color:"secondary",size:"sm",children:"Actions"}),e.jsx(ci,{children:e.jsxs(E,{children:[e.jsxs(P,{color:"info",variant:"outline",className:"mb-3",onClick:()=>j(s.tracking_id),children:[e.jsx(Y,{icon:zs})," View"]}),e.jsxs(P,{color:"secondary",variant:"outline",className:"mb-3",onClick:()=>he(s),disabled:S||!s.vehicle.name,children:[e.jsx(Y,{icon:Us})," Print"]}),e.jsx(ui,{shipment:s,onSuccess:n}),e.jsx(vi,{shipment:s,onSuccess:n})]})})]})})]},s.tracking_id)})})]}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-3",children:[e.jsx("div",{children:e.jsxs("span",{className:"text-muted",children:["Showing ",i+1," to"," ",Math.min(oe,A.filter(s=>s.isInWarehouse).length)," ","of ",A.filter(s=>s.isInWarehouse).length," entries"]})}),e.jsxs(Vs,{"aria-label":"Page navigation",children:[e.jsx(_e,{"aria-label":"Previous",disabled:y===1,onClick:()=>H(y-1),children:e.jsx("span",{"aria-hidden":"true",children:"Previous"})}),[...Array(v)].map((s,t)=>e.jsx(_e,{active:y===t+1,onClick:()=>H(t+1),children:t+1},t+1)),e.jsx(_e,{"aria-label":"Next",disabled:y===v,onClick:()=>H(y+1),children:e.jsx("span",{"aria-hidden":"true",children:"Next"})})]})]})]}):e.jsx(Ws,{color:"success",className:"text-center p-4",children:"No shipment records found"}),e.jsxs(ds,{visible:u,onClose:()=>f(!1),size:"lg",children:[e.jsx(os,{closeButton:!0,children:e.jsx("h5",{children:"Shipment Details"})}),e.jsx(ps,{children:o&&e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Basic Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tracking ID:"})," ",o.tracking_id]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dispatch Status:"})," ",o.dispatch]})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Shipping Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Country:"})," ",o.country]})]})]}),e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Shipper Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(Q=o.shipper)==null?void 0:Q.shipper_company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(ue=o.shipper)==null?void 0:ue.shipper_contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(ve=o.shipper)==null?void 0:ve.shipper_contact_email_address]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(xe=o.shipper)==null?void 0:xe.shipper_contact_phone_number]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(je=o.shipper)==null?void 0:je.shipper_company_address]})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Consignee Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(fe=o.consignee)==null?void 0:fe.consignee_company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(ye=o.consignee)==null?void 0:ye.consignee_contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(be=o.consignee)==null?void 0:be.consignee_contact_email_address]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(Ce=o.consignee)==null?void 0:Ce.consignee_contact_phone_number]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(Ne=o.consignee)==null?void 0:Ne.consignee_company_address]})]})]}),e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-12",children:[e.jsx("h6",{children:"Shipment Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Description:"})," ",(Se=o.shipment)==null?void 0:Se.shipment_description]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Weight:"})," ",(we=o.shipment)==null?void 0:we.shipment_weight," kg"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dimensions:"})," ",(De=o.shipment)==null?void 0:De.shipment_dimension_length," x"," ",(Ae=o.shipment)==null?void 0:Ae.shipment_dimension_width," x"," ",(Ie=o.shipment)==null?void 0:Ie.shipment_dimension_height," cm"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Volume:"})," ",(Ee=o.shipment)==null?void 0:Ee.shipment_volume," m³"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Value:"})," ",(Le=o.shipment)==null?void 0:Le.shipment_value]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Instructions:"})," ",(ke=o.shipment)==null?void 0:ke.shipment_instructions]})]})})]})}),e.jsx(hs,{children:e.jsx(P,{color:"secondary",variant:"outline",onClick:()=>f(!1),children:"Close"})})]})]})},ji=()=>{const{showSuccess:g,showError:w}=cs(),[S,T]=r.useState([]),[M,k]=r.useState([]),[V,B]=r.useState(!0),[O,G]=r.useState(null),[D,F]=r.useState(null),[a,K]=r.useState(""),o="https://backend-log1.axleshift.com/",[de,u]=r.useState(!1),[f,me]=r.useState(1),[W]=r.useState(10),y=i=>{if(i.photo){const p=`${o}uploads/dispatchReceipts/${i.photo}`;F(p),u(!0)}else w("No receipt image available")};r.useEffect(()=>{H()},[]);const H=async()=>{var i,p,v,b;try{B(!0);const x=await U.get("/api/v1/dispatch/all");T(x.data.data)}catch(x){G(((p=(i=x==null?void 0:x.response)==null?void 0:i.data)==null?void 0:p.message)||"Error fetching data"),w(((b=(v=x==null?void 0:x.response)==null?void 0:v.data)==null?void 0:b.message)||"Error fetching receiving history")}finally{B(!1)}};r.useEffect(()=>{(async()=>{var p,v,b,x;try{const j=await U.get("/api/v1/warehouseLoc/locations");j.data.data&&k(j.data.data)}catch(j){G((v=(p=j==null?void 0:j.response)==null?void 0:p.data)==null?void 0:v.message),w(((x=(b=j==null?void 0:j.response)==null?void 0:b.data)==null?void 0:x.message)||"Error fetching warehouses")}})()},[]);const C=i=>{if(!M.length)return"Loading...";const p=M.find(v=>v._id===i);return p?p.warehouseName:"N/A"},c=S.filter(i=>{var v,b,x,j,pe,he,Y,Q;const p=a.toLowerCase();return((v=i.shipment.tracking_id)==null?void 0:v.toLowerCase().includes(p))||((x=(b=i.shipper)==null?void 0:b.company_name)==null?void 0:x.toLowerCase().includes(p))||((pe=(j=i.consignee)==null?void 0:j.company_name)==null?void 0:pe.toLowerCase().includes(p))||((Y=(he=i.vehicle)==null?void 0:he.name)==null?void 0:Y.toLowerCase().includes(p))||((Q=i.receiveBy)==null?void 0:Q.toLowerCase().includes(p))}),d=f*W,n=d-W,N=c.slice(n,d),l=Math.ceil(c.length/W),A=i=>{me(i)};if(V)return e.jsx("div",{className:"text-center py-5",children:"Loading..."});const oe=({icon:i})=>{const[p,v]=r.useState(!1);return e.jsx(R,{icon:i,bounce:p,onMouseEnter:()=>v(!0),onMouseLeave:()=>v(!1)})};return e.jsxs("div",{className:"container-fluid px-4",children:[e.jsx("h1",{className:"mt-4",children:"Receiving History"}),e.jsx("div",{className:"mb-4",children:e.jsxs("div",{className:"input-group",children:[e.jsx("span",{className:"input-group-text",children:e.jsx(R,{icon:Gs})}),e.jsx(L,{placeholder:"Search by tracking ID, company, receiver...",value:a,id:"searchInput",onChange:i=>K(i.target.value)})]})}),e.jsx("div",{children:e.jsxs("div",{children:[e.jsx(oi,{children:N.map((i,p)=>{var v,b,x,j,pe,he,Y,Q,ue,ve,xe,je,fe,ye,be,Ce,Ne,Se,we,De,Ae,Ie,Ee,Le,ke,s,t,h,m,_,I,$,J,X,Z,ee,se,ie,ae,ne,te,re,le,ce,Pe,Te,Fe,$e,Re,Me,Ve,We,He,Be,Oe,qe,ze,Ue,Ge,Ke,Ye,Qe,Je,Xe,Ze,es,ss,is,as,ns,ts,rs,ls,gs,ms,_s,us,vs,xs,js,fs,ys,bs,Cs,Ns,Ss,ws,Ds,As;return e.jsxs(pi,{children:[e.jsx(hi,{children:e.jsxs("div",{className:"d-flex justify-content-between w-100 me-3",children:[e.jsxs("span",{children:[e.jsx(R,{icon:Ks,className:"me-2"}),"Tracking ID: ",(v=i.shipment)==null?void 0:v.tracking_id]}),e.jsxs("span",{children:["Dispatch Date ",new Date(i.receiveDate).toLocaleDateString()]})]})}),e.jsxs(gi,{children:[e.jsxs("div",{className:"row g-3 mb-3  justify-content-between",children:[e.jsx("div",{className:"col-md-3",children:e.jsxs(E,{children:[e.jsxs(E,{className:"me-2 mb-3",children:[e.jsx(R,{icon:Is,className:"me-2"}),e.jsx("strong",{children:"Shipping Details"})]}),e.jsxs(E,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Shipping Type:"})," ",(b=i.shipping)==null?void 0:b.shipping_type]}),e.jsx("p",{children:((j=(x=i.shipping)==null?void 0:x.shipping_details)==null?void 0:j.destination_address)!=null&&((he=(pe=i.shipping)==null?void 0:pe.shipping_details)==null?void 0:he.destination_address)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Destination Address:"})," ",(Q=(Y=i.shipping)==null?void 0:Y.shipping_details)==null?void 0:Q.destination_address]})}),e.jsx("p",{children:((ve=(ue=i.shipping)==null?void 0:ue.shipping_details)==null?void 0:ve.loading_port)!=null&&((je=(xe=i.shipping)==null?void 0:xe.shipping_details)==null?void 0:je.loading_port)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Loading Port:"})," ",(ye=(fe=i.shipping)==null?void 0:fe.shipping_details)==null?void 0:ye.loading_port]})}),e.jsx("p",{children:((Ce=(be=i.shipping)==null?void 0:be.shipping_details)==null?void 0:Ce.discharge_port)!=null&&((Se=(Ne=i.shipping)==null?void 0:Ne.shipping_details)==null?void 0:Se.discharge_port)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Discharge Port:"})," ",(De=(we=i.shipping)==null?void 0:we.shipping_details)==null?void 0:De.discharge_port]})}),e.jsx("p",{children:((Ie=(Ae=i.shipping)==null?void 0:Ae.shipping_details)==null?void 0:Ie.sailing_date)!=null&&((Le=(Ee=i.shipping)==null?void 0:Ee.shipping_details)==null?void 0:Le.sailing_date)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Sailing Date:"})," ",new Date((s=(ke=i.shipping)==null?void 0:ke.shipping_details)==null?void 0:s.sailing_date).toLocaleDateString()]})}),e.jsx("p",{children:((h=(t=i.shipping)==null?void 0:t.shipping_details)==null?void 0:h.estimated_arrival_date)!=null&&((_=(m=i.shipping)==null?void 0:m.shipping_details)==null?void 0:_.estimated_arrival_date)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Estimated Arrival Date:"})," ",new Date(($=(I=i.shipping)==null?void 0:I.shipping_details)==null?void 0:$.estimated_arrival_date).toLocaleDateString()]})}),e.jsx("p",{children:((X=(J=i.shipping)==null?void 0:J.shipping_details)==null?void 0:X.cargo_type)!=null&&((ee=(Z=i.shipping)==null?void 0:Z.shipping_details)==null?void 0:ee.cargo_type)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Cargo Type:"})," ",(ie=(se=i.shipping)==null?void 0:se.shipping_details)==null?void 0:ie.cargo_type]})}),e.jsx("p",{children:((ne=(ae=i.shipping)==null?void 0:ae.shipping_details)==null?void 0:ne.destination_airport)!=null&&((re=(te=i.shipping)==null?void 0:te.shipping_details)==null?void 0:re.destination_airport)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Destination airport:"})," ",(ce=(le=i.shipping)==null?void 0:le.shipping_details)==null?void 0:ce.destination_airport]})}),e.jsx("p",{children:((Te=(Pe=i.shipping)==null?void 0:Pe.shipping_details)==null?void 0:Te.delivery_date)!=null&&(($e=(Fe=i.shipping)==null?void 0:Fe.shipping_details)==null?void 0:$e.delivery_date)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Delivery Date:"})," ",new Date((Me=(Re=i.shipping)==null?void 0:Re.shipping_details)==null?void 0:Me.delivery_date).toLocaleDateString()]})}),e.jsx("p",{children:((We=(Ve=i.shipping)==null?void 0:Ve.shipping_details)==null?void 0:We.flight_type)!=null&&((Be=(He=i.shipping)==null?void 0:He.shipping_details)==null?void 0:Be.flight_type)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Flight Details:"})," ",(qe=(Oe=i.shipping)==null?void 0:Oe.shipping_details)==null?void 0:qe.flight_type]})}),e.jsx("p",{children:((Ue=(ze=i.shipping)==null?void 0:ze.shipping_details)==null?void 0:Ue.preferred_arrival_date)!=null&&((Ke=(Ge=i.shipping)==null?void 0:Ge.shipping_details)==null?void 0:Ke.preferred_arrival_date)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Arrival Date:"})," ",new Date((Qe=(Ye=i.shipping)==null?void 0:Ye.shipping_details)==null?void 0:Qe.preferred_arrival_date).toLocaleDateString()]})}),e.jsx("p",{children:((Xe=(Je=i.shipping)==null?void 0:Je.shipping_details)==null?void 0:Xe.preferred_departure_date)!=null&&((es=(Ze=i.shipping)==null?void 0:Ze.shipping_details)==null?void 0:es.flight_type)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Departure Date:"})," ",new Date((is=(ss=i.shipping)==null?void 0:ss.shipping_details)==null?void 0:is.preferred_departure_date).toLocaleDateString()]})})]})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs(E,{children:[e.jsxs(E,{className:" mb-3",children:[e.jsx(R,{icon:Ys,className:"me-2"}),e.jsx("strong",{children:"Shipper Information"})]}),e.jsxs(E,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(as=i.shipper)==null?void 0:as.company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(ns=i.shipper)==null?void 0:ns.contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(ts=i.shipper)==null?void 0:ts.email]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(rs=i.shipper)==null?void 0:rs.phone]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(ls=i.shipper)==null?void 0:ls.address]})]})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs(E,{children:[e.jsxs(E,{className:"me-2 mb-3",children:[e.jsx(R,{icon:Qs,className:"me-2"}),e.jsx("strong",{children:"Consignee Information"})]}),e.jsxs(E,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(gs=i.consignee)==null?void 0:gs.company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(ms=i.consignee)==null?void 0:ms.contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(_s=i.consignee)==null?void 0:_s.email]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(us=i.consignee)==null?void 0:us.phone]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(vs=i.consignee)==null?void 0:vs.address]})]})]})}),e.jsx(E,{className:"col-md-6",children:e.jsxs(ks,{children:[e.jsxs(Ps,{children:[e.jsx(R,{icon:Is,className:"me-2"}),"Shipment Details"]}),e.jsxs(Ts,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Description:"})," ",(xs=i.shipment)==null?void 0:xs.description]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Weight:"})," ",(js=i.shipment)==null?void 0:js.weight," kg"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dimensions:"})," ",(ys=(fs=i.shipment)==null?void 0:fs.dimension)==null?void 0:ys.length," x"," ",(Cs=(bs=i.shipment)==null?void 0:bs.dimension)==null?void 0:Cs.width," x ",(Ss=(Ns=i.shipment)==null?void 0:Ns.dimension)==null?void 0:Ss.height," ","cm"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Warehouse:"})," ",C(i.warehouse_id)]})]})]})}),e.jsx(E,{className:"col-md-6",children:e.jsxs(ks,{children:[e.jsxs(Ps,{children:[e.jsx(R,{icon:Js,className:"me-2"}),"Vehicle use to transport"]}),e.jsxs(Ts,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Vehicle:"})," ",(ws=i.vehicle)==null?void 0:ws.name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Plate No:"})," ",(Ds=i.vehicle)==null?void 0:Ds.plate_no]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Driver:"})," ",(As=i.vehicle)==null?void 0:As.driver_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dispatch By:"})," ",i.receiveBy]})]})]})})]}),e.jsx("div",{className:"text-center mt-3",children:e.jsxs(P,{color:"primary",className:"me-2",variant:"outline",onClick:()=>y(i),children:[e.jsx(oe,{icon:Xs,className:"me-2"}),"Photo"]})})]})]},i._id||p)})}),c.length>W&&e.jsxs(Vs,{className:"mt-4 justify-content-center","aria-label":"Page navigation",children:[e.jsx(_e,{onClick:()=>A(f-1),disabled:f===1,children:"Previous"}),[...Array(l)].map((i,p)=>e.jsx(_e,{active:f===p+1,onClick:()=>A(p+1),children:p+1},p+1)),e.jsx(_e,{onClick:()=>A(f+1),disabled:f===l,children:"Next"})]})]})}),e.jsx(E,{className:"text-center",children:e.jsxs(ds,{visible:de,onClose:()=>{u(!1),F(null)},size:"lg",alignment:"center",children:[e.jsx(os,{closeButton:!0,children:"Receipt Image"}),e.jsx(ps,{className:"text-center",children:D&&e.jsx(Ms,{src:D,alt:"Receipt",style:{maxWidth:"100%",maxHeight:"70vh",objectFit:"contain"},onError:i=>{w("Error loading image"),i.target.src="placeholder-image-url.jpg"}})}),e.jsxs(hs,{children:[e.jsx(P,{color:"secondary",variant:"outline",onClick:()=>{u(!1),F(null)},children:"Close"}),e.jsx("a",{href:D,target:"_blank",rel:"noopener noreferrer",children:e.jsx(P,{color:"primary",variant:"outline",children:"Open in New Tab"})})]})]})}),O&&e.jsx(Ws,{color:"danger",children:O})]})},Oi=()=>{const[g,w]=r.useState(0),S=()=>{w(T=>T+1)};return e.jsxs(e.Fragment,{children:[e.jsx("h1",{children:"Dispatching Items"}),e.jsxs(mi,{activeItemKey:"Dispatching",children:[e.jsxs(_i,{variant:"tabs",children:[e.jsx(Fs,{itemKey:"Dispatching",children:"Dispatching"}),e.jsx(Fs,{itemKey:"Dispatching History",children:"Dispatching History"})]}),e.jsxs(di,{children:[e.jsx($s,{className:"p-3",itemKey:"Dispatching",children:e.jsx(xi,{onSuccess:S})}),e.jsx($s,{className:"p-3",itemKey:"Dispatching History",children:e.jsx(ji,{onSuccess:S})})]})]})]})};export{Oi as default};
