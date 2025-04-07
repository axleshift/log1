import{l as Se,r as i,j as e,k as Ae,n as R,E as Qe}from"./index-oK4_cjtr.js";import{i as Je,F as E,w as qe,f as Oe,b as ze,a as se,x as Xe,y as Ze,k as es,z as ss,A as ns,B as as,D as is}from"./index-BXjDqJpC.js";import{a as k}from"./CButton-BuIKmGst.js";import{C as Ie,a as De,b as Ee,c as ke}from"./CModalHeader-AU35Eh-T.js";import{C as Le,a as ts}from"./CFormInput-CdVQ9r3w.js";import{C as $e}from"./CFormSelect-Dsn7-KPi.js";import{C as cs}from"./CInputGroup-BzIC-QP3.js";import{C as Ke}from"./1-CafIYk1U.js";import{C as Ne}from"./CAlert-BM2-mCId.js";import{C as rs,a as os,b as Me,c as q,d as ls,e as X}from"./CTable-Z6T-8I6R.js";import{b as ds,c as hs,d as ps,a as ms}from"./DefaultLayout-DUQjdB1T.js";import{C as F}from"./CContainer-BpfzISMU.js";import{C as Ge,a as ne}from"./CPaginationItem-BZstXv7Q.js";import{C as gs,a as us,b as xs,c as vs}from"./CAccordionHeader-B37jRm7V.js";import{C as Fe}from"./CCard-BrEz3-r-.js";import{C as He}from"./CCardHeader-CitGbwN0.js";import{C as Be}from"./CCardBody-BLfd61Yo.js";import{C as js,a as fs,b as Ve,c as Ue}from"./CTabList-DKXeL_UR.js";import"./index.esm-DJhTDB-G.js";import"./cil-user-Ddrdy7PS.js";import"./getTransitionDurationFromElement-Cpu4p4hx.js";const _s=({shipment:c={},onSuccess:N=()=>{}})=>{const{showError:f,showSuccess:L}=Se(),[H,T]=i.useState(!1),[_,W]=i.useState(!1),[A,z]=i.useState([]),[r,B]=i.useState([]),[C,V]=i.useState(null),[y,Z]=i.useState(null),[$,b]=i.useState({items:0,amount:0}),S=async()=>{try{const a=await R.get("api/v1/vehicle");z(a.data.data||[])}catch{f("Error fetching vehicles")}},I=async()=>{try{const a=await R.get("api/v1/warehouseLoc/locations");B(a.data.data||[])}catch{f("Error fetching warehouse locations")}},U=()=>{T(!0),S(),I(),b({items:0,amount:0})},P=()=>{T(!1),V(null),Z(null),b({items:0,amount:0})},O=async()=>{var a,h,o;if(!C){f("Please select a vehicle");return}if(!y){f("Please select a warehouse location");return}W(!0);try{const D={items:parseInt($.items),type:"public",warehouse_id:y._id,warehouse_name:y.warehouseName,vehicle:{name:C.brand+" "+C.model,plate_no:C.regisNumber,driver_name:((a=C.assignedDriver)==null?void 0:a.driverName)||"No Driver Assigned"}};(await R.put(`https://backend-log2.axleshift.com/api/v1/shipment/${c._id}`,D)).status===200&&(L("Successfully updated warehouse status"),P(),N&&N())}catch(D){f(((o=(h=D==null?void 0:D.response)==null?void 0:h.data)==null?void 0:o.message)||"Error updating warehouse status")}finally{W(!1)}},u=({icon:a})=>{const[h,o]=i.useState(!1);return e.jsx(E,{icon:a,bounce:h,onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs(k,{color:"primary",variant:"outline",className:"mb-3",onClick:U,disabled:c==null?void 0:c.isInWarehouse,children:[e.jsx(u,{icon:Je})," Warehouse"]}),e.jsxs(Ie,{visible:H,onClose:P,backdrop:"static",children:[e.jsx(De,{closeButton:!0,children:e.jsx("h5",{children:"Update Warehouse Status"})}),e.jsx(Ee,{children:e.jsxs("div",{className:"mb-3",children:[e.jsx(Le,{id:"tracking_id",label:"Tracking ID",type:"text",className:"form-control mb-3",floatingLabel:"Tracking ID",value:(c==null?void 0:c.tracking_id)||"",disabled:!0}),e.jsxs($e,{className:"mb-3",id:"warehouse_id",label:"Select Warehouse Location",floatingLabel:"Select Warehouse Location",value:(y==null?void 0:y._id)||"",onChange:a=>{const h=r.find(o=>o._id===a.target.value);Z(h)},children:[e.jsx("option",{value:"",children:"Choose a warehouse location..."}),r.map(a=>e.jsxs("option",{value:a._id,children:[a.warehouseName," - ",a.address]},a._id))]}),e.jsxs($e,{className:"form-select mb-3",id:"vehicle_id",label:"Select Vehicle",floatingLabel:"Select Vehicle",value:(C==null?void 0:C._id)||"",onChange:a=>{const h=A.find(o=>o._id===a.target.value);V(h)},children:[e.jsx("option",{value:"",children:"Choose a vehicle..."}),A.filter(a=>a.status==="in_use").map(a=>e.jsxs("option",{value:a._id,children:[a.brand," ",a.model," - ",a.regisNumber,a.assignedDriver?` (Driver: ${a.assignedDriver.driverName})`:" (No Driver)"]},a._id))]})]})}),e.jsxs(ke,{children:[e.jsx(k,{color:"secondary",variant:"outline",onClick:P,disabled:_,children:"Cancel"}),e.jsx(k,{color:"primary",variant:"outline",onClick:O,disabled:_||!C||!y,children:_?e.jsxs(e.Fragment,{children:[e.jsx(Ae,{size:"sm",className:"me-2"}),"Updating..."]}):"Update Status"})]})]})]})},Cs=({shipment:c={},onSuccess:N=()=>{}})=>{var O;const{showError:f,showSuccess:L}=Se(),[H,T]=i.useState(!1),[_,W]=i.useState(!1),[A,z]=i.useState([]),[r,B]=i.useState(null),[C,V]=i.useState(null),[y,Z]=i.useState(null),$=()=>{T(!0)},b=()=>{T(!1)},S=u=>{const a=u.target.files[0];if(a){if(!a.type.match("image.*")){f("Please select an image file");return}B(a);const h=new FileReader;h.onloadend=()=>{Z(h.result)},h.readAsDataURL(a)}};i.useEffect(()=>{(async()=>{var a,h;try{const o=await R.get("/api/v1/warehouseLoc/locations");o.data.data&&(z(o.data.data),L(o.data.message))}catch(o){setLocalError((a=o==null?void 0:o.response)==null?void 0:a.data.message),f(((h=o==null?void 0:o.response)==null?void 0:h.data.message)||"Error fetching warehouses")}})()},[]);const I=u=>{if(!A.length)return"Loading...";const a=A.find(h=>h._id===u);return a?a.warehouseName:"Not Yet Assigned"},U=async()=>{var u,a,h;if(!(c!=null&&c._id)){f("Invalid shipment data");return}W(!0);try{const o=Qe(),d=(await R.get(`https://backend-log2.axleshift.com/api/v1/shipment/${c._id}`)).data.shipment;console.log("Complete Shipment Data:",d);const ee=new FormData;r&&ee.append("photo",r);const n={shipper:{company_name:d.shipper.shipper_company_name,contact_name:d.shipper.shipper_contact_name,email:d.shipper.shipper_contact_email_address,phone:d.shipper.shipper_contact_phone_number,address:d.shipper.shipper_company_address},consignee:{company_name:d.consignee.consignee_company_name,contact_name:d.consignee.consignee_contact_name,email:d.consignee.consignee_contact_email_address,phone:d.consignee.consignee_contact_phone_number,address:d.consignee.consignee_company_address},shipment:{description:d.shipment.shipment_description,weight:d.shipment.shipment_weight,dimension:{length:d.shipment.shipment_dimension_length,width:d.shipment.shipment_dimension_width,height:d.shipment.shipment_dimension_height},tracking_id:d.tracking_id,isInWarehouse:!0},vehicle:{name:d.vehicle.name,plate_no:d.vehicle.plate_no,driver_name:d.vehicle.driver_name},warehouse_id:d.warehouse_id,shipping:{type:d.shipping.shipping_type},tracking_id:d.tracking_id,receiveDate:new Date().toISOString(),receiveBy:o};ee.append("data",JSON.stringify(n));const l=await R.post("api/v1/receiving/add",ee,{headers:{"Content-Type":"multipart/form-data"}});console.log("createReceivingResponse",l);const x=await R.put(`https://backend-log2.axleshift.com/api/v1/shipment/${c._id}`,{isInWarehouse:!0,vehicle:{name:null,plate_no:null,driver_name:null}});l.status===201&&x.status===200&&(L("Shipment completed and copied to receiving successfully"),b(),N&&N())}catch(o){console.error("Error details:",(u=o.response)==null?void 0:u.data),f(((h=(a=o==null?void 0:o.response)==null?void 0:a.data)==null?void 0:h.message)||"Error completing shipment")}finally{W(!1)}};if((c==null?void 0:c.paid)==="Paid")return null;const P=({icon:u})=>{const[a,h]=i.useState(!1);return e.jsx(E,{icon:u,bounce:a,onMouseEnter:()=>h(!0),onMouseLeave:()=>h(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs(k,{className:"mb-2",color:"success",variant:"outline",onClick:$,disabled:_||!((O=c==null?void 0:c.vehicle)!=null&&O.name),children:[e.jsx(P,{icon:qe,className:"me-1"})," Complete"]}),e.jsxs(Ie,{visible:H,onClose:b,backdrop:"static",children:[e.jsx(De,{closeButton:!0,children:e.jsx("h5",{children:"Complete Shipment"})}),e.jsx(Ee,{children:e.jsxs("div",{className:"mb-3",children:[e.jsx("h6",{children:"Shipment Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tracking ID:"})," ",c==null?void 0:c.tracking_id]}),e.jsx(ts,{htmlFor:"receipt",children:"Picture Of Receipts"}),e.jsx(cs,{className:"mb-3",children:e.jsx(Le,{type:"file",id:"receipt",accept:"images/*",onChange:S})}),y&&e.jsx("div",{className:"mb-3",children:e.jsx(Ke,{src:y,rounded:!0,align:"center",alt:"Receipts",width:200,height:200})}),e.jsx("div",{className:"alert alert-info mt-3",children:e.jsxs("small",{children:[e.jsx("strong",{children:"Note:"})," This action will:",e.jsx("ul",{className:"mb-0",children:e.jsxs("li",{children:["Store to warehouse “",I(c==null?void 0:c.warehouse_id),"“"]})})]})})]})}),e.jsxs(ke,{children:[e.jsx(k,{color:"secondary",variant:"outline",className:"mb-3",onClick:b,disabled:_,children:"Cancel"}),e.jsx(k,{className:"mb-3",color:"primary",variant:"outline",onClick:U,disabled:_||!y,children:_?e.jsxs(e.Fragment,{children:[e.jsx(Ae,{size:"sm",className:"me-2"}),"Completing..."]}):"Complete Shipment"})]})]})]})},ys=()=>{var x,w,v,j,K,G,Y,Q,ae,ie,te,ce,re,oe,le,de,he,pe;const{showError:c,showSuccess:N}=Se(),[f,L]=i.useState(!1),[H,T]=i.useState(null),[_,W]=i.useState([]),[A,z]=i.useState(""),[r,B]=i.useState(null),[C,V]=i.useState(!1),[y,Z]=i.useState(!1),[$,b]=i.useState([]),[S,I]=i.useState(1),[U]=i.useState(10),P=async()=>{var s,t,p,m;L(!0);try{const g=await R.get("https://backend-log2.axleshift.com/api/v1/shipment");if(console.log(g.data),g.status===200){const M=g.data.shipments||[];W(M),T(null)}}catch(g){T(((t=(s=g==null?void 0:g.response)==null?void 0:s.data)==null?void 0:t.message)||"Error fetching data"),c(((m=(p=g==null?void 0:g.response)==null?void 0:p.data)==null?void 0:m.message)||"Error fetching data")}finally{L(!1)}};i.useEffect(()=>{(async()=>{var t,p;try{const m=await R.get("/api/v1/warehouseLoc/locations");m.data.data&&b(m.data.data)}catch(m){setLocalError((t=m==null?void 0:m.response)==null?void 0:t.data.message),c(((p=m==null?void 0:m.response)==null?void 0:p.data.message)||"Error fetching warehouses")}})()},[]);const O=s=>{if(!$.length)return"Loading...";const t=$.find(p=>p._id===s);return t?e.jsx(se,{color:"success",children:t.warehouseName}):e.jsx(se,{color:"danger",children:"Not Yet Assigned"})},u=_.filter(s=>{var p,m,g,M,J,me,ge,ue,xe,ve,je,fe,_e,Ce,ye,be,we;const t=A.toLowerCase();return((p=s.tracking_id)==null?void 0:p.toLowerCase().includes(t))||((g=(m=s.shipper)==null?void 0:m.shipper_company_name)==null?void 0:g.toLowerCase().includes(t))||((J=(M=s.consignee)==null?void 0:M.consignee_company_name)==null?void 0:J.toLowerCase().includes(t))||((me=s.type)==null?void 0:me.toLowerCase().includes(t))||((ge=s.dispatch)==null?void 0:ge.toLowerCase().includes(t))||((ue=s.paid)==null?void 0:ue.toLowerCase().includes(t))||((ve=(xe=s.vehicle)==null?void 0:xe.driver_name)==null?void 0:ve.toLowerCase().includes(t))||((fe=(je=s.vehicle)==null?void 0:je.vehicle_plate_no)==null?void 0:fe.toLowerCase().includes(t))||((Ce=(_e=s.vehicle)==null?void 0:_e.name)==null?void 0:Ce.toLowerCase().includes(t))||((be=(ye=s.vehicle)==null?void 0:ye.plate_no)==null?void 0:be.toLowerCase().includes(t))||((we=O(s.warehouse_id))==null?void 0:we.toLowerCase().includes(t))}),a=S*U,h=a-U,o=u.slice(h,a),D=Math.ceil(u.length/U),d=s=>{try{const t=_.find(p=>p.tracking_id===s);B(t),V(!0)}catch{c("Error viewing shipment details")}};if(i.useEffect(()=>{P()},[]),f)return e.jsx("div",{className:"d-flex justify-content-center p-4",children:e.jsx(Ae,{})});if(H)return e.jsx(Ne,{color:"danger",className:"text-center p-4",children:H});const ee=s=>{var m,g,M,J,me,ge,ue,xe,ve,je,fe,_e,Ce,ye,be,we,Pe,Re,Te,We;const t=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),p=Ye=>new Intl.NumberFormat("en-US",{style:"currency",currency:"PHP"}).format(Ye);return`
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
          <div class="document-title">PICK UP DETAILS</div>
          <div class="document-number">Tracking ID: ${s.tracking_id}</div>
          <div>Date: ${t}</div>
        </div>
  
        <div class="section">
          <div class="section-title">SHIPPER DETAILS</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Company:</span>
              <span class="value">${((m=s.shipper)==null?void 0:m.shipper_company_name)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Contact Person:</span>
              <span class="value">${((g=s.shipper)==null?void 0:g.shipper_contact_name)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Phone:</span>
              <span class="value">${((M=s.shipper)==null?void 0:M.shipper_contact_phone_number)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Email:</span>
              <span class="value">${((J=s.shipper)==null?void 0:J.shipper_contact_email_address)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Address:</span>
              <span class="value">${((me=s.shipper)==null?void 0:me.shipper_company_address)||"N/A"}</span>
            </div>
          </div>
        </div>
  
        <div class="section">
          <div class="section-title">CONSIGNEE DETAILS</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Company:</span>
              <span class="value">${((ge=s.consignee)==null?void 0:ge.consignee_company_name)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Contact Person:</span>
              <span class="value">${((ue=s.consignee)==null?void 0:ue.consignee_contact_name)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Phone:</span>
              <span class="value">${((xe=s.consignee)==null?void 0:xe.consignee_contact_phone_number)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Email:</span>
              <span class="value">${((ve=s.consignee)==null?void 0:ve.consignee_contact_email_address)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Address:</span>
              <span class="value">${((je=s.consignee)==null?void 0:je.consignee_company_address)||"N/A"}</span>
            </div>
          </div>
        </div>
  
        <div class="section">
          <div class="section-title">SHIPMENT DETAILS</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Description:</span>
              <span class="value">${((fe=s.shipment)==null?void 0:fe.shipment_description)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Weight:</span>
              <span class="value">${((_e=s.shipment)==null?void 0:_e.shipment_weight)||"0"} kg</span>
            </div>
            <div class="info-item">
              <span class="label">Dimensions:</span>
              <span class="value">${((Ce=s.shipment)==null?void 0:Ce.shipment_dimension_length)||"0"} x ${((ye=s.shipment)==null?void 0:ye.shipment_dimension_width)||"0"} x ${((be=s.shipment)==null?void 0:be.shipment_dimension_height)||"0"} cm</span>
            </div>
            <div class="info-item">
              <span class="label">Volume:</span>
              <span class="value">${((we=s.shipment)==null?void 0:we.shipment_volume)||"0"} m³</span>
            </div>
            <div class="info-item">
              <span class="label">Declared Value:</span>
              <span class="value">${p(((Pe=s.shipment)==null?void 0:Pe.shipment_value)||0)}</span>
            </div>
          </div>
        </div>
  
        <div class="section">
          <div class="section-title">VEHICLE DETAILS</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Vehicle Type:</span>
              <span class="value">${((Re=s.vehicle)==null?void 0:Re.name)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Driver Name:</span>
              <span class="value">${((Te=s.vehicle)==null?void 0:Te.driver_name)||"N/A"}</span>
            </div>
           
            <div class="info-item">
              <span class="label">Vehicle Plate No:</span>
              <span class="value">${((We=s.vehicle)==null?void 0:We.plate_no)||"N/A"}</span>
            </div>
          </div>
        </div>
  
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
    `},n=s=>{const t=ee(s),p=window.open("","_blank");p.document.write(t),p.document.close(),p.print()};if(_.filter(s=>!s.isInWarehouse&&s.dispatch!=="Completed").length===0)return e.jsx("div",{className:"text-center d-flex justify-content-center align-items-center",children:e.jsxs(Ne,{color:"warning",className:"w-75",children:[" ","Receiving shipments is done"]})});const l=({icon:s})=>{const[t,p]=i.useState(!1);return e.jsx(E,{icon:s,bounce:t,onMouseEnter:()=>p(!0),onMouseLeave:()=>p(!1)})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mb-3",children:e.jsxs("div",{className:"row align-items-center",children:[e.jsx("div",{className:"col-md-6",children:e.jsx(Le,{type:"text",className:"mb-2",id:"searchInput",placeholder:"Search shipments...",value:A,onChange:s=>z(s.target.value)})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"text-end",children:e.jsxs("span",{className:"text-muted",children:["Total Records:"," ",u.filter(s=>!s.isInWarehouse&&s.dispatch!=="Completed").length]})})})]})}),Array.isArray(_)&&_.length>0?e.jsxs(e.Fragment,{children:[e.jsxs(rs,{hover:!0,responsive:!0,children:[e.jsx(os,{className:"text-center",children:e.jsxs(Me,{children:[e.jsx(q,{children:"Tracking ID"}),e.jsx(q,{children:"Shipper"}),e.jsx(q,{children:"Shipper Address"}),e.jsx(q,{children:"Consignee"}),e.jsxs(q,{children:[e.jsx(E,{icon:Oe,className:"me-2"}),"Vehicle"]}),e.jsxs(q,{children:[e.jsx(E,{icon:ze,className:"me-2"}),"Driver"]}),e.jsx(q,{children:"Storage Warehouse"}),e.jsx(q,{children:"Actions"})]})}),e.jsx(ls,{className:"text-center",children:o.filter(s=>!s.isInWarehouse&&s.dispatch!=="Completed").map(s=>{var t,p,m,g,M,J;return e.jsxs(Me,{children:[e.jsx(X,{children:s.tracking_id}),e.jsx(X,{children:((t=s.shipper)==null?void 0:t.shipper_company_address)||"N/A"}),e.jsx(X,{children:((p=s.shipper)==null?void 0:p.shipper_company_name)||"N/A"}),e.jsx(X,{children:((m=s.consignee)==null?void 0:m.consignee_company_name)||"N/A"}),e.jsx(X,{children:(g=s.vehicle)!=null&&g.name&&((M=s.vehicle)!=null&&M.plate_no)?e.jsxs(se,{color:"info",children:[s.vehicle.name," (",s.vehicle.plate_no,")"]}):e.jsx(se,{color:"secondary",children:"N/A"})}),e.jsx(X,{children:(J=s.vehicle)!=null&&J.driver_name?e.jsx(se,{color:"info",children:s.vehicle.driver_name}):e.jsx(se,{color:"secondary",children:"N/A"})}),e.jsx(X,{children:O(s.warehouse_id)}),e.jsx(X,{children:e.jsxs(ds,{children:[e.jsx(hs,{color:"secondary",size:"sm",children:"Actions"}),e.jsx(ps,{children:e.jsxs(F,{children:[e.jsxs(k,{color:"info",variant:"outline",className:"mb-3",onClick:()=>d(s.tracking_id),children:[e.jsx(l,{icon:Xe})," View"]}),e.jsxs(k,{color:"secondary",variant:"outline",className:"mb-3",onClick:()=>n(s),disabled:f||!s.vehicle,children:[e.jsx(l,{icon:Ze})," Print"]}),e.jsx(_s,{shipment:s,onSuccess:P}),e.jsx(Cs,{shipment:s,onSuccess:P})]})})]})})]},s.tracking_id)})})]}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-3",children:[e.jsx("div",{children:e.jsxs("span",{className:"text-muted",children:["Showing ",h+1," to"," ",Math.min(a,u.filter(s=>!s.isInWarehouse&&s.dispatch!=="Completed").length)," ","of"," ",u.filter(s=>!s.isInWarehouse&&s.dispatch!=="Completed").length," ","entries"]})}),e.jsxs(Ge,{"aria-label":"Page navigation",children:[e.jsx(ne,{"aria-label":"Previous",disabled:S===1,onClick:()=>I(S-1),children:e.jsx("span",{"aria-hidden":"true",children:"Previous"})}),[...Array(D)].map((s,t)=>e.jsx(ne,{active:S===t+1,onClick:()=>I(t+1),children:t+1},t+1)),e.jsx(ne,{"aria-label":"Next",disabled:S===D,onClick:()=>I(S+1),children:e.jsx("span",{"aria-hidden":"true",children:"Next"})})]})]})]}):e.jsx(Ne,{color:"success",className:"text-center p-4",children:"No shipment records found"}),e.jsxs(Ie,{visible:C,onClose:()=>V(!1),size:"lg",children:[e.jsx(De,{closeButton:!0,children:e.jsx("h5",{children:"Shipment Details"})}),e.jsx(Ee,{children:r&&e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Basic Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tracking ID:"})," ",r.tracking_id]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dispatch Status:"})," ",r.dispatch]})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Shipping Country"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Country:"})," ",r.country]})]})]}),e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Shipper Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(x=r.shipper)==null?void 0:x.shipper_company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(w=r.shipper)==null?void 0:w.shipper_contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(v=r.shipper)==null?void 0:v.shipper_contact_email_address]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(j=r.shipper)==null?void 0:j.shipper_contact_phone_number]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(K=r.shipper)==null?void 0:K.shipper_company_address]})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Consignee Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(G=r.consignee)==null?void 0:G.consignee_company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(Y=r.consignee)==null?void 0:Y.consignee_contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(Q=r.consignee)==null?void 0:Q.consignee_contact_email_address]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(ae=r.consignee)==null?void 0:ae.consignee_contact_phone_number]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(ie=r.consignee)==null?void 0:ie.consignee_company_address]})]})]}),e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-12",children:[e.jsx("h6",{children:"Shipment Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Description:"})," ",(te=r.shipment)==null?void 0:te.shipment_description]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Weight:"})," ",(ce=r.shipment)==null?void 0:ce.shipment_weight," kg"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dimensions:"})," ",(re=r.shipment)==null?void 0:re.shipment_dimension_length," x"," ",(oe=r.shipment)==null?void 0:oe.shipment_dimension_width," x"," ",(le=r.shipment)==null?void 0:le.shipment_dimension_height," cm"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Volume:"})," ",(de=r.shipment)==null?void 0:de.shipment_volume," m³"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Value:"})," ",(he=r.shipment)==null?void 0:he.shipment_value]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Instructions:"})," ",(pe=r.shipment)==null?void 0:pe.shipment_instructions]})]})})]})}),e.jsx(ke,{children:e.jsx(k,{color:"secondary",variant:"outline",onClick:()=>V(!1),children:"Close"})})]})]})},bs=()=>{const{showSuccess:c,showError:N}=Se(),[f,L]=i.useState([]),[H,T]=i.useState([]),[_,W]=i.useState(!0),[A,z]=i.useState(null),[r,B]=i.useState(null),[C,V]=i.useState(""),y="http://localhost:5057/",[Z,$]=i.useState(!1),[b,S]=i.useState(1),[I]=i.useState(10),U=n=>{if(n.photo){const l=`${y}uploads/pickupReceipts/${n.photo}`;B(l),$(!0),c("Receipt image loaded successfully")}else N("No receipt image available")};i.useEffect(()=>{P()},[]),i.useEffect(()=>{console.log("API_URL:",y)},[]);const P=async()=>{var n,l,x,w;try{W(!0);const v=await R.get("/api/v1/receiving/all");L(v.data.data)}catch(v){console.error("Error fetching receiving data:",v),z(((l=(n=v==null?void 0:v.response)==null?void 0:n.data)==null?void 0:l.message)||"Error fetching data"),N(((w=(x=v==null?void 0:v.response)==null?void 0:x.data)==null?void 0:w.message)||"Error fetching receiving history")}finally{W(!1)}};i.useEffect(()=>{(async()=>{var l,x,w,v;try{const j=await R.get("/api/v1/warehouseLoc/locations");j.data.data&&T(j.data.data)}catch(j){z((x=(l=j==null?void 0:j.response)==null?void 0:l.data)==null?void 0:x.message),N(((v=(w=j==null?void 0:j.response)==null?void 0:w.data)==null?void 0:v.message)||"Error fetching warehouses")}})()},[]);const O=n=>{if(!H.length)return"Loading...";const l=H.find(x=>x._id===n);return l?l.warehouseName:"N/A"},u=f.filter(n=>{var x,w,v,j,K,G,Y,Q;const l=C.toLowerCase();return((x=n.shipment.tracking_id)==null?void 0:x.toLowerCase().includes(l))||((v=(w=n.shipper)==null?void 0:w.company_name)==null?void 0:v.toLowerCase().includes(l))||((K=(j=n.consignee)==null?void 0:j.company_name)==null?void 0:K.toLowerCase().includes(l))||((Y=(G=n.vehicle)==null?void 0:G.name)==null?void 0:Y.toLowerCase().includes(l))||((Q=n.receiveBy)==null?void 0:Q.toLowerCase().includes(l))}),a=b*I,h=a-I,o=u.slice(h,a),D=Math.ceil(u.length/I),d=n=>{S(n)};if(_)return e.jsx("div",{className:"text-center py-5",children:"Loading..."});const ee=({icon:n})=>{const[l,x]=i.useState(!1);return e.jsx(E,{icon:n,bounce:l,onMouseEnter:()=>x(!0),onMouseLeave:()=>x(!1)})};return e.jsxs("div",{className:"container-fluid px-4",children:[e.jsx("h1",{className:"mt-4",children:"Receiving History"}),e.jsx("div",{className:"mb-4",children:e.jsxs("div",{className:"input-group",children:[e.jsx("span",{className:"input-group-text",children:e.jsx(E,{icon:es})}),e.jsx(Le,{placeholder:"Search by tracking ID, company, receiver...",value:C,id:"searchInput",onChange:n=>V(n.target.value)})]})}),e.jsx("div",{children:e.jsxs("div",{children:[e.jsx(gs,{children:o.map((n,l)=>{var x,w,v,j,K,G,Y,Q,ae,ie,te,ce,re,oe,le,de,he,pe,s,t,p,m,g;return e.jsxs(us,{children:[e.jsx(xs,{children:e.jsxs("div",{className:"d-flex justify-content-between w-100 me-3",children:[e.jsxs("span",{children:[e.jsx(E,{icon:ss,className:"me-2"}),"Tracking ID: ",(x=n.shipment)==null?void 0:x.tracking_id]}),e.jsxs("span",{children:["Received: ",new Date(n.receiveDate).toLocaleDateString()]})]})}),e.jsxs(vs,{children:[e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-md-6",children:e.jsxs(F,{children:[e.jsxs(F,{className:" mb-3",children:[e.jsx(E,{icon:ns,className:"me-2"}),e.jsx("strong",{children:"Shipper Information"})]}),e.jsxs(F,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(w=n.shipper)==null?void 0:w.company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(v=n.shipper)==null?void 0:v.contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(j=n.shipper)==null?void 0:j.email]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(K=n.shipper)==null?void 0:K.phone]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(G=n.shipper)==null?void 0:G.address]})]})]})}),e.jsx("div",{className:"col-md-6",children:e.jsxs(F,{children:[e.jsxs(F,{className:"me-2 mb-3",children:[e.jsx(E,{icon:ze,className:"me-2"}),e.jsx("strong",{children:"Consignee Information"})]}),e.jsxs(F,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(Y=n.consignee)==null?void 0:Y.company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(Q=n.consignee)==null?void 0:Q.contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(ae=n.consignee)==null?void 0:ae.email]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(ie=n.consignee)==null?void 0:ie.phone]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(te=n.consignee)==null?void 0:te.address]})]})]})}),e.jsx(F,{className:"col-md-6",children:e.jsxs(Fe,{children:[e.jsxs(He,{children:[e.jsx(E,{icon:as,className:"me-2"}),"Shipment Details"]}),e.jsxs(Be,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Description:"})," ",(ce=n.shipment)==null?void 0:ce.description]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Weight:"})," ",(re=n.shipment)==null?void 0:re.weight," kg"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dimensions:"})," ",(le=(oe=n.shipment)==null?void 0:oe.dimension)==null?void 0:le.length," x"," ",(he=(de=n.shipment)==null?void 0:de.dimension)==null?void 0:he.width," x ",(s=(pe=n.shipment)==null?void 0:pe.dimension)==null?void 0:s.height," ","cm"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Warehouse:"})," ",O(n.warehouse_id)]})]})]})}),e.jsx(F,{className:"col-md-6",children:e.jsxs(Fe,{children:[e.jsxs(He,{children:[e.jsx(E,{icon:Oe,className:"me-2"}),"Vehicle use to transport"]}),e.jsxs(Be,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Vehicle:"})," ",(t=n.vehicle)==null?void 0:t.name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Plate No:"})," ",(p=n.vehicle)==null?void 0:p.plate_no]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Driver:"})," ",(m=n.vehicle)==null?void 0:m.driver_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Shipping Type:"})," ",(g=n.shipping)==null?void 0:g.type]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Received By:"})," ",n.receiveBy]})]})]})})]}),e.jsx("div",{className:"text-center mt-3",children:e.jsxs(k,{color:"primary",variant:"outline",className:"me-2",onClick:()=>U(n),children:[e.jsx(ee,{icon:is,className:"me-2"}),"Photo"]})})]})]},n._id||l)})}),u.length>I&&e.jsxs(Ge,{className:"mt-4 justify-content-center","aria-label":"Page navigation",children:[e.jsx(ne,{onClick:()=>d(b-1),disabled:b===1,children:"Previous"}),[...Array(D)].map((n,l)=>e.jsx(ne,{active:b===l+1,onClick:()=>d(l+1),children:l+1},l+1)),e.jsx(ne,{onClick:()=>d(b+1),disabled:b===D,children:"Next"})]})]})}),e.jsx(F,{className:"text-center",children:e.jsxs(Ie,{visible:Z,onClose:()=>{$(!1),B(null)},size:"lg",alignment:"center",children:[e.jsx(De,{closeButton:!0,children:"Receipt Image"}),e.jsx(Ee,{className:"text-center",children:r&&e.jsx(Ke,{src:r,alt:"Receipt",style:{maxWidth:"100%",maxHeight:"70vh",objectFit:"contain"},onError:n=>{N("Error loading image"),n.target.src="placeholder-image-url.jpg"}})}),e.jsxs(ke,{children:[e.jsx(k,{color:"secondary",variant:"outline",onClick:()=>{$(!1),B(null)},children:"Close"}),e.jsx("a",{href:r,target:"_blank",rel:"noopener noreferrer",children:e.jsx(k,{color:"primary",variant:"outline",children:"Open in New Tab"})})]})]})}),A&&e.jsx(Ne,{color:"danger",children:A})]})},zs=()=>{const[c,N]=i.useState(0),f=()=>{N(L=>L+1)};return e.jsxs(e.Fragment,{children:[e.jsx("h1",{children:"Receiving Items"}),e.jsxs(js,{activeItemKey:"Receiving",children:[e.jsxs(fs,{variant:"tabs",children:[e.jsx(Ve,{itemKey:"Receiving",children:"Receiving"}),e.jsx(Ve,{itemKey:"Receiving History",children:"Receiving History"})]}),e.jsxs(ms,{children:[e.jsx(Ue,{className:"p-3",itemKey:"Receiving",children:e.jsx(ys,{onSuccess:f})}),e.jsx(Ue,{className:"p-3",itemKey:"Receiving History",children:e.jsx(bs,{},c)})]})]})]})};export{zs as default};
