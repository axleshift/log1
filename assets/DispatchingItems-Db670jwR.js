import{l as cs,r as t,n as U,j as e,k as Rs,F as Hs,E as Bs}from"./index-CDBEKR8m.js";import{E as Os,F as $,w as qs,a as he,x as zs,y as Us,k as Gs,z as Ks,B as Is,A as Ys,b as Qs,f as Js,D as Xs}from"./index-BZSDq1jT.js";import{a as k}from"./CButton-BIvZ-J4N.js";import{C as os,a as ds,b as ps,c as hs}from"./CModalHeader-D9K_epp8.js";import{C as Zs}from"./CForm-CJwbtsib.js";import{C as Es}from"./CFormSelect-AIdqeu-0.js";import{C as E,a as ei}from"./CFormInput-B6JhvP-D.js";import{C as si}from"./CFormTextarea-Dg8YXvZN.js";import{C as ii}from"./CInputGroup-DNMVtog-.js";import{C as Ms}from"./1-Cdrai1gQ.js";import{C as ai,a as ni,b as Ls,c as q,d as ti,e as z}from"./CTable-Ez-jL17Z.js";import{b as ri,c as li,d as ci,a as oi}from"./DefaultLayout-DVBkXjcr.js";import{C as I}from"./CContainer-DncXOvlk.js";import{C as Vs,a as _e}from"./CPaginationItem-C7kbKv-4.js";import{C as Ws}from"./CAlert-COglbjmG.js";import{C as di,a as pi,b as hi,c as gi}from"./CAccordionHeader-CEElsRfB.js";import{C as ks}from"./CCard-y_jN0oNm.js";import{C as Ps}from"./CCardHeader-bOtoRGnU.js";import{C as Ts}from"./CCardBody-DFxpVfuj.js";import{C as mi,a as _i,b as Fs,c as $s}from"./CTabList-BmCcwp9E.js";import"./index.esm-CffKrjm9.js";import"./cil-user-Ddrdy7PS.js";import"./getTransitionDurationFromElement-Cpu4p4hx.js";const ui=({shipment:g={},onSuccess:w=()=>{}})=>{const{showSuccess:S,showError:P}=cs(),[R,L]=t.useState(!1),[M,H]=t.useState(!1),[B,G]=t.useState([]),[D,T]=t.useState(""),[n,K]=t.useState({dispatch:"Dispatching",shipping:{shipping_type:"",shipping_details:{destination_address:"",pickup_date:"",delivery_date:"",vehicle_type:"",destination_airport:"",preferred_departure_date:"",preferred_arrival_date:"",flight_type:"",loading_port:"",discharge_port:"",sailing_date:"",estimated_arrival_date:"",cargo_type:""}},vehicle:{name:"",plate_no:"",driver_name:""}});t.useEffect(()=>{R&&d()},[R]);const d=async()=>{try{const o=(await U.get("api/v1/vehicle")).data.data.filter(l=>l.status==="in_use");G(o)}catch{P("Error fetching vehicles")}},oe=c=>{const o=c.target.value;K(l=>({...l,shipping:{...l.shipping,shipping_type:o,shipping_details:{destination_address:"",pickup_date:"",delivery_date:"",vehicle_type:"",destination_airport:"",preferred_departure_date:"",preferred_arrival_date:"",flight_type:"",loading_port:"",discharge_port:"",sailing_date:"",estimated_arrival_date:"",cargo_type:""}}})),T("")},j=c=>{const{id:o,value:l}=c.target;K(_=>({..._,shipping:{..._.shipping,shipping_details:{..._.shipping.shipping_details,[o]:l}}}))},y=c=>{const o=B.find(l=>l._id===c.target.value);o&&(T(c.target.value),K(l=>{var _;return{...l,vehicle:{name:o.brand||"",plate_no:o.regisNumber||"",driver_name:((_=o.assignedDriver)==null?void 0:_.driverName)||""},shipping:{...l.shipping,shipping_details:{...l.shipping.shipping_details,vehicle_type:o.brand||""}}}}))},ge=async()=>{var c,o;H(!0);try{let l={};n.shipping.shipping_type==="land"?l={delivery_date:n.shipping.shipping_details.delivery_date,vehicle_type:n.vehicle.plate_no}:n.shipping.shipping_type==="air"?l={destination_airport:n.shipping.shipping_details.destination_airport,preferred_departure_date:n.shipping.shipping_details.preferred_departure_date,preferred_arrival_date:n.shipping.shipping_details.preferred_arrival_date,flight_type:n.shipping.shipping_details.flight_type,vehicle_type:n.vehicle.plate_no}:n.shipping.shipping_type==="sea"&&(l={destination_address:n.shipping.shipping_details.destination_address,loading_port:n.shipping.shipping_details.loading_port,discharge_port:n.shipping.shipping_details.discharge_port,sailing_date:n.shipping.shipping_details.sailing_date,estimated_arrival_date:n.shipping.shipping_details.estimated_arrival_date,cargo_type:n.shipping.shipping_details.cargo_type,vehicle_type:n.vehicle.plate_no});const _={dispatch:n.dispatch,shipping:{shipping_type:n.shipping.shipping_type,shipping_details:l},vehicle:n.vehicle};(await Hs.put(`https://backend-log2.axleshift.com/api/v1/shipment/${g._id}`,_)).data.success&&(S("Shipment dispatched successfully"),L(!1),w())}catch(l){P(((o=(c=l.response)==null?void 0:c.data)==null?void 0:o.message)||"Error updating shipment")}finally{H(!1)}},V=()=>{K({dispatch:"Dispatching",shipping:{shipping_type:"",shipping_details:{destination_address:"",pickup_date:"",delivery_date:"",vehicle_type:"",destination_airport:"",preferred_departure_date:"",preferred_arrival_date:"",flight_type:"",loading_port:"",discharge_port:"",sailing_date:"",estimated_arrival_date:"",cargo_type:""}},vehicle:{name:"",plate_no:"",driver_name:""}}),T("")},b=new Date,W=()=>e.jsxs(Es,{className:"mb-3",label:"Select Vehicle *",value:D,onChange:y,children:[e.jsx("option",{value:"",children:"Choose a vehicle"}),B.map(c=>e.jsxs("option",{value:c._id,children:[c.brand," - ",c.regisNumber," ",c.assignedDriver?`(Driver: ${c.assignedDriver.driverName})`:"(No Driver)"]},c._id))]}),N=({icon:c})=>{const[o,l]=t.useState(!1);return e.jsx($,{icon:c,bounce:o,onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs(k,{color:"primary",variant:"outline",className:"mb-3",onClick:()=>L(!R),children:[e.jsx(N,{icon:Os})," Dispatch"]}),e.jsxs(os,{visible:R,onClose:()=>{L(!1),V()},size:"lg",children:[e.jsx(ds,{children:"Dispatch Shipment"}),e.jsx(ps,{children:e.jsxs(Zs,{children:[e.jsxs(Es,{className:"mb-3",value:n.shipping.shipping_type||"",onChange:oe,label:"Shipping Type *",required:!0,children:[e.jsx("option",{value:"",children:"Select shipping type"}),e.jsx("option",{value:"land",children:"Land"}),e.jsx("option",{value:"air",children:"Air"}),e.jsx("option",{value:"sea",children:"Sea"})]}),n.shipping.shipping_type&&e.jsx(W,{}),n.shipping.shipping_type==="land"&&e.jsx("div",{className:"mb-3",children:e.jsx(E,{className:"mb-3",type:"datetime-local",id:"delivery_date",label:"Delivery Date *",min:b.toISOString().slice(0,16),value:n.shipping.shipping_details.delivery_date||"",onChange:j,required:!0})}),n.shipping.shipping_type==="air"&&e.jsxs("div",{className:"mb-3",children:[e.jsx(E,{className:"mb-3",type:"text",id:"destination_airport",label:"Destination Airport *",value:n.shipping.shipping_details.destination_airport||"",onChange:j,required:!0}),e.jsx(E,{className:"mb-3",type:"datetime-local",id:"preferred_departure_date",label:"Preferred Departure Date *",min:b.toISOString().slice(0,16),value:n.shipping.shipping_details.preferred_departure_date||"",onChange:j,required:!0}),e.jsx(E,{className:"mb-3",type:"datetime-local",id:"preferred_arrival_date",label:"Preferred Arrival Date *",min:b.toISOString().slice(0,16),value:n.shipping.shipping_details.preferred_arrival_date||"",onChange:j,required:!0}),e.jsx(si,{className:"mb-3",type:"text",id:"flight_type",label:"Flight Details *",placeholder:"Flight Number, Airline, etc.",value:n.shipping.shipping_details.flight_type||"",onChange:j,required:!0})]}),n.shipping.shipping_type==="sea"&&e.jsxs("div",{className:"mb-3",children:[e.jsx(E,{className:"mb-3",type:"text",id:"loading_port",label:"Loading Port *",value:n.shipping.shipping_details.loading_port||"",onChange:j,required:!0}),e.jsx(E,{className:"mb-3",type:"text",id:"destination_address",label:"Vessle Name *",value:n.shipping.shipping_details.destination_address||"",onChange:j,required:!0}),e.jsx(E,{className:"mb-3",type:"text",id:"discharge_port",label:"Discharge Port *",value:n.shipping.shipping_details.discharge_port||"",onChange:j,required:!0}),e.jsx(E,{className:"mb-3",type:"datetime-local",id:"sailing_date",label:"Sailing Date *",min:b.toISOString().slice(0,16),value:n.shipping.shipping_details.sailing_date||"",onChange:j,required:!0}),e.jsx(E,{className:"mb-3",type:"datetime-local",id:"estimated_arrival_date",label:"Estimated Arrival Date *",min:b.toISOString().slice(0,16),value:n.shipping.shipping_details.estimated_arrival_date||"",onChange:j,required:!0}),e.jsx(E,{className:"mb-3",type:"text",id:"cargo_type",label:"Cargo Type *",value:n.shipping.shipping_details.cargo_type||"",onChange:j,required:!0})]})]})}),e.jsxs(hs,{children:[e.jsx(k,{color:"secondary",onClick:()=>{L(!1),V()},children:"Cancel"}),e.jsx(k,{color:"primary",onClick:ge,disabled:M,children:M?e.jsx(Rs,{size:"sm"}):"Dispatch Shipment"})]})]})]})},vi=({shipment:g={},onSuccess:w=()=>{}})=>{var W;const{showError:S,showSuccess:P}=cs(),[R,L]=t.useState(!1),[M,H]=t.useState(!1),[B,G]=t.useState([]),[D,T]=t.useState(null),[n,K]=t.useState(null),[d,oe]=t.useState(null),j=()=>{L(!0)},y=()=>{L(!1)},ge=N=>{const c=N.target.files[0];if(c){if(!c.type.match("image.*")){S("Please select an image file");return}T(c);const o=new FileReader;o.onloadend=()=>{oe(o.result)},o.readAsDataURL(c)}};t.useEffect(()=>{(async()=>{var c,o;try{const l=await U.get("/api/v1/warehouseLoc/locations");l.data.data&&G(l.data.data)}catch(l){setLocalError((c=l==null?void 0:l.response)==null?void 0:c.data.message),S(((o=l==null?void 0:l.response)==null?void 0:o.data.message)||"Error fetching warehouses")}})()},[]);const V=async()=>{var N,c,o,l;if(!(g!=null&&g._id)){S("Invalid shipment data");return}H(!0);try{const _=Bs(),a=(await U.get(`https://backend-log2.axleshift.com/api/v1/shipment/${g._id}`)).data.shipment;console.log("Complete Shipment Data:",a);const O=new FormData;if(D&&O.append("photo",D),!((N=a.shipping)!=null&&N.shipping_type)){S("Shipping type is required");return}const i={shipper:{company_name:a.shipper.shipper_company_name,contact_name:a.shipper.shipper_contact_name,email:a.shipper.shipper_contact_email_address,phone:a.shipper.shipper_contact_phone_number,address:a.shipper.shipper_company_address},consignee:{company_name:a.consignee.consignee_company_name,contact_name:a.consignee.consignee_contact_name,email:a.consignee.consignee_contact_email_address,phone:a.consignee.consignee_contact_phone_number,address:a.consignee.consignee_company_address},shipment:{description:a.shipment.shipment_description,weight:a.shipment.shipment_weight,dimension:{length:a.shipment.shipment_dimension_length,width:a.shipment.shipment_dimension_width,height:a.shipment.shipment_dimension_height},tracking_id:a.tracking_id,isInWarehouse:!1},vehicle:{name:a.vehicle.name,plate_no:a.vehicle.plate_no,driver_name:a.vehicle.driver_name},warehouse_id:a.warehouse_id,shipping:{shipping_type:a.shipping.shipping_type,shipping_details:{destination_address:a.shipping.shipping_details.destination_address,pickup_date:a.shipping.shipping_details.pickup_date,delivery_date:a.shipping.shipping_details.delivery_date,vehicle_type:a.shipping.shipping_details.vehicle_type,destination_airport:a.shipping.shipping_details.destination_airport,preferred_departure_date:a.shipping.shipping_details.preferred_departure_date,preferred_arrival_date:a.shipping.shipping_details.preferred_arrival_date,flight_type:a.shipping.shipping_details.flight_type,loading_port:a.shipping.shipping_details.loading_port,discharge_port:a.shipping.shipping_details.discharge_port,sailing_date:a.shipping.shipping_details.sailing_date,estimated_arrival_date:a.shipping.shipping_details.estimated_arrival_date,cargo_type:a.shipping.shipping_details.cargo_type}},tracking_id:a.tracking_id,receiveDate:new Date().toISOString(),receiveBy:_};O.append("data",JSON.stringify(i)),console.log("Shipping data being sent:",i.shipping);const p=await U.post("api/v1/dispatch/add",O,{headers:{"Content-Type":"multipart/form-data"}});console.log("createReceivingResponse",p);const u=await U.put(`https://backend-log2.axleshift.com/api/v1/shipment/${g._id}`,{isInWarehouse:!1,dispatch:"Completed"});p.status===201&&u.status===200&&(P("Shipment completed and copied to receiving successfully"),y(),w&&w())}catch(_){console.error("Error details:",(c=_.response)==null?void 0:c.data),S(((l=(o=_==null?void 0:_.response)==null?void 0:o.data)==null?void 0:l.message)||"Error completing shipment")}finally{H(!1)}};if((g==null?void 0:g.paid)==="Paid")return null;const b=({icon:N})=>{const[c,o]=t.useState(!1);return e.jsx($,{icon:N,bounce:c,onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs(k,{className:"mb-2",color:"success",variant:"outline",onClick:j,disabled:M||!((W=g==null?void 0:g.vehicle)!=null&&W.name),children:[e.jsx(b,{icon:qs})," Complete"]}),e.jsxs(os,{visible:R,onClose:y,backdrop:"static",children:[e.jsx(ds,{closeButton:!0,children:e.jsx("h5",{children:"Complete Shipment"})}),e.jsx(ps,{children:e.jsxs("div",{className:"mb-3",children:[e.jsx("h6",{children:"Shipment Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tracking ID:"})," ",g==null?void 0:g.tracking_id]}),e.jsx(ei,{htmlFor:"receipt",children:"Picture Of Receipts"}),e.jsx(ii,{className:"mb-3",children:e.jsx(E,{type:"file",id:"receipt",accept:"images/*",onChange:ge})}),d&&e.jsx("div",{className:"mb-3",children:e.jsx(Ms,{src:d,rounded:!0,align:"center",alt:"Receipts",width:200,height:200})}),e.jsx("div",{className:"alert alert-info mt-3",children:e.jsxs("small",{children:[e.jsx("strong",{children:"Note:"})," This action will:",e.jsx("ul",{className:"mb-0",children:e.jsx("li",{children:" Complete the Dispatching"})})]})})]})}),e.jsxs(hs,{children:[e.jsx(k,{color:"secondary",variant:"outline",className:"mb-3",onClick:y,disabled:M,children:"Cancel"}),e.jsx(k,{className:"mb-3",color:"primary",variant:"outline",onClick:V,disabled:M||!d,children:M?e.jsxs(e.Fragment,{children:[e.jsx(Rs,{size:"sm",className:"me-2"}),"Completing..."]}):"Complete Shipment"})]})]})]})},xi=()=>{var Q,ue,ve,xe,je,fe,ye,be,Ce,Ne,Se,we,De,Ae,Ie,Ee,Le,ke;const[g,w]=t.useState([]),[S,P]=t.useState(!1),[R,L]=t.useState(null),[M,H]=t.useState([]),[B,G]=t.useState(""),[D,T]=t.useState([]),{showError:n,showSuccess:K}=cs(),[d,oe]=t.useState(null),[j,y]=t.useState(!1),[ge,V]=t.useState(!1),[b,W]=t.useState(1),[N]=t.useState(10),[c,o]=t.useState(!1),l=async()=>{var s,r,h,m;P(!0);try{const v=await U.get("https://backend-log2.axleshift.com/api/v1/shipment");if(console.log(v.data),v.status===200){const A=v.data.shipments||[];w(A),L(null)}}catch(v){L(((r=(s=v==null?void 0:v.response)==null?void 0:s.data)==null?void 0:r.message)||"Error fetching data"),n(((m=(h=v==null?void 0:v.response)==null?void 0:h.data)==null?void 0:m.message)||"Error fetching data")}finally{P(!1)}};t.useEffect(()=>{(async()=>{var r,h;try{const m=await U.get("/api/v1/warehouseLoc/locations");m.data.data&&T(m.data.data)}catch(m){setLocalError((r=m==null?void 0:m.response)==null?void 0:r.data.message),n(((h=m==null?void 0:m.response)==null?void 0:h.data.message)||"Error fetching warehouses")}})()},[]);const _=s=>{if(!D.length)return"Loading...";const r=D.find(h=>h._id===s);return r?r.warehouseName:"Not Yet Assigned"},me=s=>{if(!D.length)return"Loading...";const r=D.find(h=>h._id===s);return r?r.address:"Not Yet Assigned"},a=g.filter(s=>{var h,m,v,A,F,J,X,Z,ee,se,ie,ae,ne,te,re,le,ce;const r=B.toLowerCase();return((h=s.tracking_id)==null?void 0:h.toLowerCase().includes(r))||((v=(m=s.shipper)==null?void 0:m.shipper_company_name)==null?void 0:v.toLowerCase().includes(r))||((F=(A=s.consignee)==null?void 0:A.consignee_company_name)==null?void 0:F.toLowerCase().includes(r))||((J=s.type)==null?void 0:J.toLowerCase().includes(r))||((X=s.dispatch)==null?void 0:X.toLowerCase().includes(r))||((Z=s.paid)==null?void 0:Z.toLowerCase().includes(r))||((se=(ee=s.vehicle)==null?void 0:ee.driver_name)==null?void 0:se.toLowerCase().includes(r))||((ae=(ie=s.vehicle)==null?void 0:ie.vehicle_plate_no)==null?void 0:ae.toLowerCase().includes(r))||((te=(ne=s.vehicle)==null?void 0:ne.name)==null?void 0:te.toLowerCase().includes(r))||((le=(re=s.vehicle)==null?void 0:re.plate_no)==null?void 0:le.toLowerCase().includes(r))||((ce=_(s.warehouse_id))==null?void 0:ce.toLowerCase().includes(r))}),O=b*N,i=O-N,p=a.slice(i,O),u=Math.ceil(a.length/N),C=s=>s?new Date(s).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"N/A",x=s=>{switch(s==null?void 0:s.toLowerCase()){case"pending":return"warning";case"dispatching":return"info";case"completed":return"success";case"unpaid":return"danger";case"paid":return"success";case"void":return"secondary";default:return"primary"}},f=s=>{try{const r=g.find(h=>h.tracking_id===s);oe(r),y(!0)}catch{n("Error viewing shipment details")}};t.useEffect(()=>{l()},[]);const de=s=>{var A,F,J,X,Z,ee,se,ie,ae,ne,te,re,le,ce,Pe,Te,Fe,$e,Re,Me,Ve,We,He,Be,Oe,qe,ze,Ue,Ge,Ke,Ye,Qe,Je,Xe,Ze,es,ss,is,as,ns,ts,rs;const r=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),h=ls=>new Intl.NumberFormat("en-US",{style:"currency",currency:"PHP"}).format(ls),m=((A=s.shipping)==null?void 0:A.shipping_type)==="air"?`
    <div class="section">
      <div class="section-title">AIR FREIGHT DETAILS</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Destination Airport:</span>
          <span class="value">${((J=(F=s.shipping)==null?void 0:F.shipping_details)==null?void 0:J.destination_airport)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Flight Details:</span>
          <span class="value">${((Z=(X=s.shipping)==null?void 0:X.shipping_details)==null?void 0:Z.flight_type)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Preferred Departure:</span>
          <span class="value">${C((se=(ee=s.shipping)==null?void 0:ee.shipping_details)==null?void 0:se.preferred_departure_date)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Preferred Arrival:</span>
          <span class="value">${C((ae=(ie=s.shipping)==null?void 0:ie.shipping_details)==null?void 0:ae.preferred_arrival_date)||"N/A"}</span>
        </div>
      </div>
    </div>
  `:"",v=((ne=s.shipping)==null?void 0:ne.shipping_type)==="sea"?`
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
          <span class="value">${C((Me=(Re=s.shipping)==null?void 0:Re.shipping_details)==null?void 0:Me.sailing_date)||"N/A"}</span>
        </div>
        <div class="info-item">
          <span class="label">Estimated Arrival:</span>
          <span class="value">${C((We=(Ve=s.shipping)==null?void 0:Ve.shipping_details)==null?void 0:We.estimated_arrival_date)||"N/A"}</span>
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
          <div>Date: ${r}</div>
        </div>
  
        <div class="section">
          <div class="section-title">Storage Details</div>
          <div class="info-grid">    
            <div class="info-item">
              <span class="label">Warehouse:</span>
              <span class="value">${_(s.warehouse_id)}</span>
            </div>
            <div class="info-item">
              <span class="label">Warehouse Address:</span>
              <span class="value">${me(s.warehouse_id)}</span>
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
              ${v}
              

  
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
    `},pe=s=>{const r=de(s),h=window.open("","_blank");h.document.write(r),h.document.close(),h.print()},Y=({icon:s})=>{const[r,h]=t.useState(!1);return e.jsx($,{icon:s,bounce:r,onMouseEnter:()=>h(!0),onMouseLeave:()=>h(!1)})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mb-3",children:e.jsxs("div",{className:"row align-items-center",children:[e.jsx("div",{className:"col-md-6",children:e.jsx(E,{type:"text",className:"mb-2",id:"searchInput",placeholder:"Search shipments...",value:B,onChange:s=>G(s.target.value)})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"text-end",children:e.jsxs("span",{className:"text-muted",children:["Total Records:"," ",a.filter(s=>s.isInWarehouse).length]})})})]})}),Array.isArray(g)&&g.length>0?e.jsxs(e.Fragment,{children:[e.jsxs(ai,{hover:!0,responsive:!0,children:[e.jsx(ni,{className:"text-center",children:e.jsxs(Ls,{children:[e.jsx(q,{children:"Tracking ID"}),e.jsx(q,{children:"Status"}),e.jsx(q,{children:"Shipper"}),e.jsx(q,{children:"Consignee"}),e.jsx(q,{children:"Consignee Address"}),e.jsx(q,{children:"Vehicle"}),e.jsx(q,{children:"Driver"}),e.jsx(q,{children:"Storage Warehouse"}),e.jsx(q,{children:"Actions"})]})}),e.jsx(ti,{className:"text-center",children:p.filter(s=>s.isInWarehouse).map(s=>{var r,h,m,v,A,F;return e.jsxs(Ls,{children:[e.jsx(z,{children:s.tracking_id}),e.jsx(z,{children:e.jsx(he,{color:x(s.dispatch),children:s.dispatch||"N/A"})}),e.jsx(z,{children:((r=s.shipper)==null?void 0:r.shipper_company_name)||"N/A"}),e.jsx(z,{children:((h=s.consignee)==null?void 0:h.consignee_company_name)||"N/A"}),e.jsx(z,{children:((m=s.consignee)==null?void 0:m.consignee_company_address)||"N/A"}),e.jsx(z,{children:(v=s.vehicle)!=null&&v.name&&((A=s.vehicle)!=null&&A.plate_no)?e.jsxs(he,{color:"info",children:[s.vehicle.name," (",s.vehicle.plate_no,")"]}):e.jsx(he,{color:"secondary",children:"N/A"})}),e.jsx(z,{children:(F=s.vehicle)!=null&&F.driver_name?e.jsx(he,{color:"info",children:s.vehicle.driver_name}):e.jsx(he,{color:"secondary",children:"N/A"})}),e.jsx(z,{children:s.warehouse_id?e.jsx(he,{color:"success",children:_(s.warehouse_id)}):e.jsx(he,{color:"secondary",children:"N/A"})}),e.jsx(z,{children:e.jsxs(ri,{children:[e.jsx(li,{color:"secondary",size:"sm",children:"Actions"}),e.jsx(ci,{children:e.jsxs(I,{children:[e.jsxs(k,{color:"info",variant:"outline",className:"mb-3",onClick:()=>f(s.tracking_id),children:[e.jsx(Y,{icon:zs})," View"]}),e.jsxs(k,{color:"secondary",variant:"outline",className:"mb-3",onClick:()=>pe(s),disabled:S||!s.vehicle.name,children:[e.jsx(Y,{icon:Us})," Print"]}),e.jsx(ui,{shipment:s,onSuccess:l}),e.jsx(vi,{shipment:s,onSuccess:l})]})})]})})]},s.tracking_id)})})]}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-3",children:[e.jsx("div",{children:e.jsxs("span",{className:"text-muted",children:["Showing ",i+1," to"," ",Math.min(O,a.filter(s=>s.isInWarehouse).length)," ","of ",a.filter(s=>s.isInWarehouse).length," entries"]})}),e.jsxs(Vs,{"aria-label":"Page navigation",children:[e.jsx(_e,{"aria-label":"Previous",disabled:b===1,onClick:()=>W(b-1),children:e.jsx("span",{"aria-hidden":"true",children:"Previous"})}),[...Array(u)].map((s,r)=>e.jsx(_e,{active:b===r+1,onClick:()=>W(r+1),children:r+1},r+1)),e.jsx(_e,{"aria-label":"Next",disabled:b===u,onClick:()=>W(b+1),children:e.jsx("span",{"aria-hidden":"true",children:"Next"})})]})]})]}):e.jsx(Ws,{color:"success",className:"text-center p-4",children:"No shipment records found"}),e.jsxs(os,{visible:j,onClose:()=>y(!1),size:"lg",children:[e.jsx(ds,{closeButton:!0,children:e.jsx("h5",{children:"Shipment Details"})}),e.jsx(ps,{children:d&&e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Basic Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tracking ID:"})," ",d.tracking_id]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dispatch Status:"})," ",d.dispatch]})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Shipping Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Country:"})," ",d.country]})]})]}),e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Shipper Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(Q=d.shipper)==null?void 0:Q.shipper_company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(ue=d.shipper)==null?void 0:ue.shipper_contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(ve=d.shipper)==null?void 0:ve.shipper_contact_email_address]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(xe=d.shipper)==null?void 0:xe.shipper_contact_phone_number]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(je=d.shipper)==null?void 0:je.shipper_company_address]})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Consignee Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(fe=d.consignee)==null?void 0:fe.consignee_company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(ye=d.consignee)==null?void 0:ye.consignee_contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(be=d.consignee)==null?void 0:be.consignee_contact_email_address]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(Ce=d.consignee)==null?void 0:Ce.consignee_contact_phone_number]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(Ne=d.consignee)==null?void 0:Ne.consignee_company_address]})]})]}),e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-12",children:[e.jsx("h6",{children:"Shipment Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Description:"})," ",(Se=d.shipment)==null?void 0:Se.shipment_description]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Weight:"})," ",(we=d.shipment)==null?void 0:we.shipment_weight," kg"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dimensions:"})," ",(De=d.shipment)==null?void 0:De.shipment_dimension_length," x"," ",(Ae=d.shipment)==null?void 0:Ae.shipment_dimension_width," x"," ",(Ie=d.shipment)==null?void 0:Ie.shipment_dimension_height," cm"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Volume:"})," ",(Ee=d.shipment)==null?void 0:Ee.shipment_volume," m³"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Value:"})," ",(Le=d.shipment)==null?void 0:Le.shipment_value]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Instructions:"})," ",(ke=d.shipment)==null?void 0:ke.shipment_instructions]})]})})]})}),e.jsx(hs,{children:e.jsx(k,{color:"secondary",variant:"outline",onClick:()=>y(!1),children:"Close"})})]})]})},ji=()=>{const{showSuccess:g,showError:w}=cs(),[S,P]=t.useState([]),[R,L]=t.useState([]),[M,H]=t.useState(!0),[B,G]=t.useState(null),[D,T]=t.useState(null),[n,K]=t.useState(""),d="https://backend-log1.axleshift.com/",[oe,j]=t.useState(!1),[y,ge]=t.useState(1),[V]=t.useState(10),b=i=>{if(i.photo){const p=`${d}uploads/dispatchReceipts/${i.photo}`;T(p),j(!0)}else w("No receipt image available")};t.useEffect(()=>{W()},[]),t.useEffect(()=>{console.log("API_URL:",d)},[]);const W=async()=>{var i,p,u,C;try{H(!0);const x=await U.get("/api/v1/dispatch/all");P(x.data.data)}catch(x){console.error("Error fetching receiving data:",x),G(((p=(i=x==null?void 0:x.response)==null?void 0:i.data)==null?void 0:p.message)||"Error fetching data"),w(((C=(u=x==null?void 0:x.response)==null?void 0:u.data)==null?void 0:C.message)||"Error fetching receiving history")}finally{H(!1)}};t.useEffect(()=>{(async()=>{var p,u,C,x;try{const f=await U.get("/api/v1/warehouseLoc/locations");f.data.data&&L(f.data.data)}catch(f){G((u=(p=f==null?void 0:f.response)==null?void 0:p.data)==null?void 0:u.message),w(((x=(C=f==null?void 0:f.response)==null?void 0:C.data)==null?void 0:x.message)||"Error fetching warehouses")}})()},[]);const N=i=>{if(!R.length)return"Loading...";const p=R.find(u=>u._id===i);return p?p.warehouseName:"N/A"},c=S.filter(i=>{var u,C,x,f,de,pe,Y,Q;const p=n.toLowerCase();return((u=i.shipment.tracking_id)==null?void 0:u.toLowerCase().includes(p))||((x=(C=i.shipper)==null?void 0:C.company_name)==null?void 0:x.toLowerCase().includes(p))||((de=(f=i.consignee)==null?void 0:f.company_name)==null?void 0:de.toLowerCase().includes(p))||((Y=(pe=i.vehicle)==null?void 0:pe.name)==null?void 0:Y.toLowerCase().includes(p))||((Q=i.receiveBy)==null?void 0:Q.toLowerCase().includes(p))}),o=y*V,l=o-V,_=c.slice(l,o),me=Math.ceil(c.length/V),a=i=>{ge(i)};if(M)return e.jsx("div",{className:"text-center py-5",children:"Loading..."});const O=({icon:i})=>{const[p,u]=t.useState(!1);return e.jsx($,{icon:i,bounce:p,onMouseEnter:()=>u(!0),onMouseLeave:()=>u(!1)})};return e.jsxs("div",{className:"container-fluid px-4",children:[e.jsx("h1",{className:"mt-4",children:"Receiving History"}),e.jsx("div",{className:"mb-4",children:e.jsxs("div",{className:"input-group",children:[e.jsx("span",{className:"input-group-text",children:e.jsx($,{icon:Gs})}),e.jsx(E,{placeholder:"Search by tracking ID, company, receiver...",value:n,id:"searchInput",onChange:i=>K(i.target.value)})]})}),e.jsx("div",{children:e.jsxs("div",{children:[e.jsx(di,{children:_.map((i,p)=>{var u,C,x,f,de,pe,Y,Q,ue,ve,xe,je,fe,ye,be,Ce,Ne,Se,we,De,Ae,Ie,Ee,Le,ke,s,r,h,m,v,A,F,J,X,Z,ee,se,ie,ae,ne,te,re,le,ce,Pe,Te,Fe,$e,Re,Me,Ve,We,He,Be,Oe,qe,ze,Ue,Ge,Ke,Ye,Qe,Je,Xe,Ze,es,ss,is,as,ns,ts,rs,ls,gs,ms,_s,us,vs,xs,js,fs,ys,bs,Cs,Ns,Ss,ws,Ds,As;return e.jsxs(pi,{children:[e.jsx(hi,{children:e.jsxs("div",{className:"d-flex justify-content-between w-100 me-3",children:[e.jsxs("span",{children:[e.jsx($,{icon:Ks,className:"me-2"}),"Tracking ID: ",(u=i.shipment)==null?void 0:u.tracking_id]}),e.jsxs("span",{children:["Dispatch Date ",new Date(i.receiveDate).toLocaleDateString()]})]})}),e.jsxs(gi,{children:[e.jsxs("div",{className:"row g-3 mb-3  justify-content-between",children:[e.jsx("div",{className:"col-md-3",children:e.jsxs(I,{children:[e.jsxs(I,{className:"me-2 mb-3",children:[e.jsx($,{icon:Is,className:"me-2"}),e.jsx("strong",{children:"Shipping Details"})]}),e.jsxs(I,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Shipping Type:"})," ",(C=i.shipping)==null?void 0:C.shipping_type]}),e.jsx("p",{children:((f=(x=i.shipping)==null?void 0:x.shipping_details)==null?void 0:f.destination_address)!=null&&((pe=(de=i.shipping)==null?void 0:de.shipping_details)==null?void 0:pe.destination_address)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Destination Address:"})," ",(Q=(Y=i.shipping)==null?void 0:Y.shipping_details)==null?void 0:Q.destination_address]})}),e.jsx("p",{children:((ve=(ue=i.shipping)==null?void 0:ue.shipping_details)==null?void 0:ve.loading_port)!=null&&((je=(xe=i.shipping)==null?void 0:xe.shipping_details)==null?void 0:je.loading_port)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Loading Port:"})," ",(ye=(fe=i.shipping)==null?void 0:fe.shipping_details)==null?void 0:ye.loading_port]})}),e.jsx("p",{children:((Ce=(be=i.shipping)==null?void 0:be.shipping_details)==null?void 0:Ce.discharge_port)!=null&&((Se=(Ne=i.shipping)==null?void 0:Ne.shipping_details)==null?void 0:Se.discharge_port)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Discharge Port:"})," ",(De=(we=i.shipping)==null?void 0:we.shipping_details)==null?void 0:De.discharge_port]})}),e.jsx("p",{children:((Ie=(Ae=i.shipping)==null?void 0:Ae.shipping_details)==null?void 0:Ie.sailing_date)!=null&&((Le=(Ee=i.shipping)==null?void 0:Ee.shipping_details)==null?void 0:Le.sailing_date)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Sailing Date:"})," ",new Date((s=(ke=i.shipping)==null?void 0:ke.shipping_details)==null?void 0:s.sailing_date).toLocaleDateString()]})}),e.jsx("p",{children:((h=(r=i.shipping)==null?void 0:r.shipping_details)==null?void 0:h.estimated_arrival_date)!=null&&((v=(m=i.shipping)==null?void 0:m.shipping_details)==null?void 0:v.estimated_arrival_date)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Estimated Arrival Date:"})," ",new Date((F=(A=i.shipping)==null?void 0:A.shipping_details)==null?void 0:F.estimated_arrival_date).toLocaleDateString()]})}),e.jsx("p",{children:((X=(J=i.shipping)==null?void 0:J.shipping_details)==null?void 0:X.cargo_type)!=null&&((ee=(Z=i.shipping)==null?void 0:Z.shipping_details)==null?void 0:ee.cargo_type)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Cargo Type:"})," ",(ie=(se=i.shipping)==null?void 0:se.shipping_details)==null?void 0:ie.cargo_type]})}),e.jsx("p",{children:((ne=(ae=i.shipping)==null?void 0:ae.shipping_details)==null?void 0:ne.destination_airport)!=null&&((re=(te=i.shipping)==null?void 0:te.shipping_details)==null?void 0:re.destination_airport)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Destination airport:"})," ",(ce=(le=i.shipping)==null?void 0:le.shipping_details)==null?void 0:ce.destination_airport]})}),e.jsx("p",{children:((Te=(Pe=i.shipping)==null?void 0:Pe.shipping_details)==null?void 0:Te.delivery_date)!=null&&(($e=(Fe=i.shipping)==null?void 0:Fe.shipping_details)==null?void 0:$e.delivery_date)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Delivery Date:"})," ",new Date((Me=(Re=i.shipping)==null?void 0:Re.shipping_details)==null?void 0:Me.delivery_date).toLocaleDateString()]})}),e.jsx("p",{children:((We=(Ve=i.shipping)==null?void 0:Ve.shipping_details)==null?void 0:We.flight_type)!=null&&((Be=(He=i.shipping)==null?void 0:He.shipping_details)==null?void 0:Be.flight_type)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Flight Details:"})," ",(qe=(Oe=i.shipping)==null?void 0:Oe.shipping_details)==null?void 0:qe.flight_type]})}),e.jsx("p",{children:((Ue=(ze=i.shipping)==null?void 0:ze.shipping_details)==null?void 0:Ue.preferred_arrival_date)!=null&&((Ke=(Ge=i.shipping)==null?void 0:Ge.shipping_details)==null?void 0:Ke.preferred_arrival_date)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Arrival Date:"})," ",new Date((Qe=(Ye=i.shipping)==null?void 0:Ye.shipping_details)==null?void 0:Qe.preferred_arrival_date).toLocaleDateString()]})}),e.jsx("p",{children:((Xe=(Je=i.shipping)==null?void 0:Je.shipping_details)==null?void 0:Xe.preferred_departure_date)!=null&&((es=(Ze=i.shipping)==null?void 0:Ze.shipping_details)==null?void 0:es.flight_type)!==""&&e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Departure Date:"})," ",new Date((is=(ss=i.shipping)==null?void 0:ss.shipping_details)==null?void 0:is.preferred_departure_date).toLocaleDateString()]})})]})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs(I,{children:[e.jsxs(I,{className:" mb-3",children:[e.jsx($,{icon:Ys,className:"me-2"}),e.jsx("strong",{children:"Shipper Information"})]}),e.jsxs(I,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(as=i.shipper)==null?void 0:as.company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(ns=i.shipper)==null?void 0:ns.contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(ts=i.shipper)==null?void 0:ts.email]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(rs=i.shipper)==null?void 0:rs.phone]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(ls=i.shipper)==null?void 0:ls.address]})]})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs(I,{children:[e.jsxs(I,{className:"me-2 mb-3",children:[e.jsx($,{icon:Qs,className:"me-2"}),e.jsx("strong",{children:"Consignee Information"})]}),e.jsxs(I,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(gs=i.consignee)==null?void 0:gs.company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(ms=i.consignee)==null?void 0:ms.contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(_s=i.consignee)==null?void 0:_s.email]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(us=i.consignee)==null?void 0:us.phone]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(vs=i.consignee)==null?void 0:vs.address]})]})]})}),e.jsx(I,{className:"col-md-6",children:e.jsxs(ks,{children:[e.jsxs(Ps,{children:[e.jsx($,{icon:Is,className:"me-2"}),"Shipment Details"]}),e.jsxs(Ts,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Description:"})," ",(xs=i.shipment)==null?void 0:xs.description]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Weight:"})," ",(js=i.shipment)==null?void 0:js.weight," kg"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dimensions:"})," ",(ys=(fs=i.shipment)==null?void 0:fs.dimension)==null?void 0:ys.length," x"," ",(Cs=(bs=i.shipment)==null?void 0:bs.dimension)==null?void 0:Cs.width," x ",(Ss=(Ns=i.shipment)==null?void 0:Ns.dimension)==null?void 0:Ss.height," ","cm"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Warehouse:"})," ",N(i.warehouse_id)]})]})]})}),e.jsx(I,{className:"col-md-6",children:e.jsxs(ks,{children:[e.jsxs(Ps,{children:[e.jsx($,{icon:Js,className:"me-2"}),"Vehicle use to transport"]}),e.jsxs(Ts,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Vehicle:"})," ",(ws=i.vehicle)==null?void 0:ws.name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Plate No:"})," ",(Ds=i.vehicle)==null?void 0:Ds.plate_no]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Driver:"})," ",(As=i.vehicle)==null?void 0:As.driver_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dispatch By:"})," ",i.receiveBy]})]})]})})]}),e.jsx("div",{className:"text-center mt-3",children:e.jsxs(k,{color:"primary",className:"me-2",variant:"outline",onClick:()=>b(i),children:[e.jsx(O,{icon:Xs,className:"me-2"}),"Photo"]})})]})]},i._id||p)})}),c.length>V&&e.jsxs(Vs,{className:"mt-4 justify-content-center","aria-label":"Page navigation",children:[e.jsx(_e,{onClick:()=>a(y-1),disabled:y===1,children:"Previous"}),[...Array(me)].map((i,p)=>e.jsx(_e,{active:y===p+1,onClick:()=>a(p+1),children:p+1},p+1)),e.jsx(_e,{onClick:()=>a(y+1),disabled:y===me,children:"Next"})]})]})}),e.jsx(I,{className:"text-center",children:e.jsxs(os,{visible:oe,onClose:()=>{j(!1),T(null)},size:"lg",alignment:"center",children:[e.jsx(ds,{closeButton:!0,children:"Receipt Image"}),e.jsx(ps,{className:"text-center",children:D&&e.jsx(Ms,{src:D,alt:"Receipt",style:{maxWidth:"100%",maxHeight:"70vh",objectFit:"contain"},onError:i=>{w("Error loading image"),i.target.src="placeholder-image-url.jpg"}})}),e.jsxs(hs,{children:[e.jsx(k,{color:"secondary",variant:"outline",onClick:()=>{j(!1),T(null)},children:"Close"}),e.jsx("a",{href:D,target:"_blank",rel:"noopener noreferrer",children:e.jsx(k,{color:"primary",variant:"outline",children:"Open in New Tab"})})]})]})}),B&&e.jsx(Ws,{color:"danger",children:B})]})},Oi=()=>{const[g,w]=t.useState(0),S=()=>{w(P=>P+1)};return e.jsxs(e.Fragment,{children:[e.jsx("h1",{children:"Dispatching Items"}),e.jsxs(mi,{activeItemKey:"Dispatching",children:[e.jsxs(_i,{variant:"tabs",children:[e.jsx(Fs,{itemKey:"Dispatching",children:"Dispatching"}),e.jsx(Fs,{itemKey:"Dispatching History",children:"Dispatching History"})]}),e.jsxs(oi,{children:[e.jsx($s,{className:"p-3",itemKey:"Dispatching",children:e.jsx(xi,{onSuccess:S})}),e.jsx($s,{className:"p-3",itemKey:"Dispatching History",children:e.jsx(ji,{onSuccess:S})})]})]})]})};export{Oi as default};
