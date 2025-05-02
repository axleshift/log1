import{l as we,r as i,j as e,k as Le,n as M,F as Ge,A as Qe}from"./index-Csb6LGYQ.js";import{i as Je,F as L,x as qe,f as Ue,b as Oe,a as ee,y as Xe,z as Ze,k as es,A as ss,B as ns,D as as,E as is}from"./index-DR__Bmlu.js";import{a as A}from"./CButton-xYfsFmXD.js";import{C as Se,a as Ie,b as De,c as ke}from"./CModalHeader-Ddas35qS.js";import{C as Ee,a as ts}from"./CFormInput-f2a8oeA-.js";import{C as We}from"./CFormSelect-C1r65ghA.js";import{C as cs}from"./CInputGroup-CffURYMu.js";import{C as ze}from"./1-B_HZyjvk.js";import{C as Ne}from"./CAlert-C3In0CUE.js";import{C as rs,a as os,b as $e,c as q,d as ls,e as X}from"./CTable-C_kZkx49.js";import{b as ds,c as hs,d as ps,a as ms}from"./DefaultLayout-BselYkSR.js";import{C as V}from"./CContainer-B-zbMWDF.js";import{C as Ke,a as se}from"./CPaginationItem-B4fcx8ha.js";import{C as gs,a as us,b as xs,c as vs}from"./CAccordionHeader-CR-17YZq.js";import{C as Me}from"./CCard-NorjZmAT.js";import{C as Fe}from"./CCardHeader-B11k8edq.js";import{C as He}from"./CCardBody-BJZZWNkB.js";import{C as js,a as fs,b as Be,c as Ve}from"./CTabList-DzTH9zjP.js";import"./index.esm-DK3JKpBW.js";import"./cil-user-Ddrdy7PS.js";import"./getTransitionDurationFromElement-Cpu4p4hx.js";const _s=({shipment:c={},onSuccess:I=()=>{}})=>{const{showError:f,showSuccess:P}=we(),[R,y]=i.useState(!1),[S,T]=i.useState(!1),[F,o]=i.useState([]),[W,z]=i.useState([]),[_,Z]=i.useState(null),[N,$]=i.useState(null),[D,b]=i.useState({items:0,amount:0}),k=async()=>{try{const a=await M.get("api/v1/vehicle");o(a.data.data||[])}catch{f("Error fetching vehicles")}},U=async()=>{try{const a=await M.get("api/v1/warehouseLoc/locations");z(a.data.data||[])}catch{f("Error fetching warehouse locations")}},O=()=>{y(!0),k(),U(),b({items:0,amount:0})},H=()=>{y(!1),Z(null),$(null),b({items:0,amount:0})},w=async()=>{var a,d,r;if(!_){f("Please select a vehicle");return}if(!N){f("Please select a warehouse location");return}T(!0);try{const E={items:parseInt(D.items),type:"public",warehouse_id:N._id,warehouse_name:N.warehouseName,vehicle:{name:_.brand+" "+_.model,plate_no:_.regisNumber,driver_name:((a=_.assignedDriver)==null?void 0:a.driverName)||"No Driver Assigned"}};(await M.put(`https://backend-log2.axleshift.com/api/v1/shipment/${c._id}`,E)).status===200&&(P("Successfully scheduled vehicle"),H(),I&&I())}catch(E){f(((r=(d=E==null?void 0:E.response)==null?void 0:d.data)==null?void 0:r.message)||"Error scheduling vehicle")}finally{T(!1)}},v=({icon:a})=>{const[d,r]=i.useState(!1);return e.jsx(L,{icon:a,bounce:d,onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs(A,{color:"primary",variant:"outline",className:"mb-3",onClick:O,disabled:c==null?void 0:c.isInWarehouse,children:[e.jsx(v,{icon:Je})," Warehouse"]}),e.jsxs(Se,{visible:R,onClose:H,backdrop:"static",children:[e.jsx(Ie,{closeButton:!0,children:e.jsx("h5",{children:"Update Warehouse Status"})}),e.jsx(De,{children:e.jsxs("div",{className:"mb-3",children:[e.jsx(Ee,{id:"tracking_id",label:"Tracking ID",type:"text",className:"form-control mb-3",floatingLabel:"Tracking ID",value:(c==null?void 0:c.tracking_id)||"",disabled:!0}),e.jsxs(We,{className:"mb-3",id:"warehouse_id",label:"Select Warehouse Location",floatingLabel:"Select Warehouse Location",value:(N==null?void 0:N._id)||"",onChange:a=>{const d=W.find(r=>r._id===a.target.value);$(d)},children:[e.jsx("option",{value:"",children:"Choose a warehouse location..."}),W.map(a=>e.jsxs("option",{value:a._id,children:[a.warehouseName," - ",a.address]},a._id))]}),e.jsxs(We,{className:"form-select mb-3",id:"vehicle_id",label:"Select Vehicle",floatingLabel:"Select Vehicle",value:(_==null?void 0:_._id)||"",onChange:a=>{const d=F.find(r=>r._id===a.target.value);Z(d)},children:[e.jsx("option",{value:"",children:"Choose a vehicle..."}),F.filter(a=>a.status==="in_use").map(a=>e.jsxs("option",{value:a._id,children:[a.brand," ",a.model," - ",a.regisNumber,a.assignedDriver?` (Driver: ${a.assignedDriver.driverName})`:" (No Driver)"]},a._id))]})]})}),e.jsxs(ke,{children:[e.jsx(A,{color:"secondary",variant:"outline",onClick:H,disabled:S,children:"Cancel"}),e.jsx(A,{color:"primary",variant:"outline",onClick:w,disabled:S||!_||!N,children:S?e.jsxs(e.Fragment,{children:[e.jsx(Le,{size:"sm",className:"me-2"}),"Updating..."]}):"Update Status"})]})]})]})},Cs=({shipment:c={},onSuccess:I=()=>{}})=>{var w;const{showError:f,showSuccess:P}=we(),[R,y]=i.useState(!1),[S,T]=i.useState(!1),[F,o]=i.useState([]),[W,z]=i.useState(null),[_,Z]=i.useState(null),[N,$]=i.useState(null),D=()=>{y(!0)},b=()=>{y(!1)},k=v=>{const a=v.target.files[0];if(a){if(!a.type.match("image.*")){f("Please select an image file");return}z(a);const d=new FileReader;d.onloadend=()=>{$(d.result)},d.readAsDataURL(a)}};i.useEffect(()=>{(async()=>{var a,d;try{const r=await M.get("/api/v1/warehouseLoc/locations");r.data.data&&o(r.data.data)}catch(r){setLocalError((a=r==null?void 0:r.response)==null?void 0:a.data.message),f(((d=r==null?void 0:r.response)==null?void 0:d.data.message)||"Error fetching warehouses")}})()},[]);const U=v=>{if(!F.length)return"Loading...";const a=F.find(d=>d._id===v);return a?a.warehouseName:"Not Yet Assigned"},O=async()=>{var v,a,d;if(!(c!=null&&c._id)){f("Invalid shipment data");return}T(!0);try{const r=Ge(),h=(await M.get(`https://backend-log2.axleshift.com/api/v1/shipment/${c._id}`)).data.shipment,n=new FormData;W&&n.append("photo",W);const l={shipper:{company_name:h.shipper.shipper_company_name,contact_name:h.shipper.shipper_contact_name,email:h.shipper.shipper_contact_email_address,phone:h.shipper.shipper_contact_phone_number,address:h.shipper.shipper_company_address},consignee:{company_name:h.consignee.consignee_company_name,contact_name:h.consignee.consignee_contact_name,email:h.consignee.consignee_contact_email_address,phone:h.consignee.consignee_contact_phone_number,address:h.consignee.consignee_company_address},shipment:{description:h.shipment.shipment_description,weight:h.shipment.shipment_weight,dimension:{length:h.shipment.shipment_dimension_length,width:h.shipment.shipment_dimension_width,height:h.shipment.shipment_dimension_height},tracking_id:h.tracking_id,isInWarehouse:!0},vehicle:{name:h.vehicle.name,plate_no:h.vehicle.plate_no,driver_name:h.vehicle.driver_name},warehouse_id:h.warehouse_id,shipping:{type:h.shipping.shipping_type},tracking_id:h.tracking_id,receiveDate:new Date().toISOString(),receiveBy:r};n.append("data",JSON.stringify(l));const g=await M.post("api/v1/receiving/add",n,{headers:{"Content-Type":"multipart/form-data"}}),C=await M.put(`https://backend-log2.axleshift.com/api/v1/shipment/${c._id}`,{isInWarehouse:!0,vehicle:{name:null,plate_no:null,driver_name:null}});g.status===201&&C.status===200&&(P("Shipment receiving completed successfully"),b(),I&&I())}catch(r){console.error("Error details:",(v=r.response)==null?void 0:v.data),f(((d=(a=r==null?void 0:r.response)==null?void 0:a.data)==null?void 0:d.message)||"Error completing shipment")}finally{T(!1)}};if((c==null?void 0:c.paid)==="Paid")return null;const H=({icon:v})=>{const[a,d]=i.useState(!1);return e.jsx(L,{icon:v,bounce:a,onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs(A,{className:"mb-2",color:"success",variant:"outline",onClick:D,disabled:S||!((w=c==null?void 0:c.vehicle)!=null&&w.name),children:[e.jsx(H,{icon:qe,className:"me-1"})," Complete"]}),e.jsxs(Se,{visible:R,onClose:b,backdrop:"static",children:[e.jsx(Ie,{closeButton:!0,children:e.jsx("h5",{children:"Complete Shipment"})}),e.jsx(De,{children:e.jsxs("div",{className:"mb-3",children:[e.jsx("h6",{children:"Shipment Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tracking ID:"})," ",c==null?void 0:c.tracking_id]}),e.jsx(ts,{htmlFor:"receipt",children:"Picture Of Receipts"}),e.jsx(cs,{className:"mb-3",children:e.jsx(Ee,{type:"file",id:"receipt",accept:"images/*",onChange:k})}),N&&e.jsx("div",{className:"mb-3",children:e.jsx(ze,{src:N,rounded:!0,align:"center",alt:"Receipts",width:200,height:200})}),e.jsx("div",{className:"alert alert-info mt-3",children:e.jsxs("small",{children:[e.jsx("strong",{children:"Note:"})," This action will:",e.jsx("ul",{className:"mb-0",children:e.jsxs("li",{children:["Store to warehouse “",U(c==null?void 0:c.warehouse_id),"“"]})})]})})]})}),e.jsxs(ke,{children:[e.jsx(A,{color:"secondary",variant:"outline",className:"mb-3",onClick:b,disabled:S,children:"Cancel"}),e.jsx(A,{className:"mb-3",color:"primary",variant:"outline",onClick:O,disabled:S||!N,children:S?e.jsxs(e.Fragment,{children:[e.jsx(Le,{size:"sm",className:"me-2"}),"Completing..."]}):"Complete Shipment"})]})]})]})},ys=()=>{var g,C,u,j,K,Y,G,Q,ne,ae,ie,te,ce,re,oe,le,de,he;const{showError:c}=we(),[I,f]=i.useState(!1),[P,R]=i.useState(null),[y,S]=i.useState([]),[T,F]=i.useState(""),[o,W]=i.useState(null),[z,_]=i.useState(!1),[Z,N]=i.useState(!1),[$,D]=i.useState([]),[b,k]=i.useState(1),[U]=i.useState(10),O=async()=>{var s,t,p,m;f(!0);try{const x=await M.get("https://backend-log2.axleshift.com/api/v1/shipment");if(x.status===200){const B=x.data.shipments||[];S(B),R(null)}}catch(x){R(((t=(s=x==null?void 0:x.response)==null?void 0:s.data)==null?void 0:t.message)||"Error fetching data"),c(((m=(p=x==null?void 0:x.response)==null?void 0:p.data)==null?void 0:m.message)||"Error fetching data")}finally{f(!1)}};i.useEffect(()=>{(async()=>{var t,p;try{const m=await M.get("/api/v1/warehouseLoc/locations");m.data.data&&D(m.data.data)}catch(m){setLocalError((t=m==null?void 0:m.response)==null?void 0:t.data.message),c(((p=m==null?void 0:m.response)==null?void 0:p.data.message)||"Error fetching warehouses")}})()},[]);const H=s=>{if(!$.length)return"Loading...";const t=$.find(p=>p._id===s);return t?e.jsx(ee,{color:"success",children:t.warehouseName}):e.jsx(ee,{color:"danger",children:"Not Yet Assigned"})},w=y.filter(s=>{var p,m,x,B,J,pe,me,ge,ue,xe,ve,je,fe,_e,Ce,ye,be;const t=T.toLowerCase();return((p=s.tracking_id)==null?void 0:p.toLowerCase().includes(t))||((x=(m=s.shipper)==null?void 0:m.shipper_company_name)==null?void 0:x.toLowerCase().includes(t))||((J=(B=s.consignee)==null?void 0:B.consignee_company_name)==null?void 0:J.toLowerCase().includes(t))||((pe=s.type)==null?void 0:pe.toLowerCase().includes(t))||((me=s.dispatch)==null?void 0:me.toLowerCase().includes(t))||((ge=s.paid)==null?void 0:ge.toLowerCase().includes(t))||((xe=(ue=s.vehicle)==null?void 0:ue.driver_name)==null?void 0:xe.toLowerCase().includes(t))||((je=(ve=s.vehicle)==null?void 0:ve.vehicle_plate_no)==null?void 0:je.toLowerCase().includes(t))||((_e=(fe=s.vehicle)==null?void 0:fe.name)==null?void 0:_e.toLowerCase().includes(t))||((ye=(Ce=s.vehicle)==null?void 0:Ce.plate_no)==null?void 0:ye.toLowerCase().includes(t))||((be=H(s.warehouse_id))==null?void 0:be.toLowerCase().includes(t))}),v=b*U,a=v-U,d=w.slice(a,v),r=Math.ceil(w.length/U),E=s=>{try{const t=y.find(p=>p.tracking_id===s);W(t),_(!0)}catch{c("Error viewing shipment details")}};if(i.useEffect(()=>{O()},[]),I)return e.jsx("div",{className:"d-flex justify-content-center p-4",children:e.jsx(Le,{})});if(P)return e.jsx(Ne,{color:"danger",className:"text-center p-4",children:P});const h=s=>{var m,x,B,J,pe,me,ge,ue,xe,ve,je,fe,_e,Ce,ye,be,Ae,Pe,Re,Te;const t=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),p=Ye=>new Intl.NumberFormat("en-US",{style:"currency",currency:"PHP"}).format(Ye);return`
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
              <span class="value">${((x=s.shipper)==null?void 0:x.shipper_contact_name)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Phone:</span>
              <span class="value">${((B=s.shipper)==null?void 0:B.shipper_contact_phone_number)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Email:</span>
              <span class="value">${((J=s.shipper)==null?void 0:J.shipper_contact_email_address)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Address:</span>
              <span class="value">${((pe=s.shipper)==null?void 0:pe.shipper_company_address)||"N/A"}</span>
            </div>
          </div>
        </div>
  
        <div class="section">
          <div class="section-title">CONSIGNEE DETAILS</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Company:</span>
              <span class="value">${((me=s.consignee)==null?void 0:me.consignee_company_name)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Contact Person:</span>
              <span class="value">${((ge=s.consignee)==null?void 0:ge.consignee_contact_name)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Phone:</span>
              <span class="value">${((ue=s.consignee)==null?void 0:ue.consignee_contact_phone_number)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Email:</span>
              <span class="value">${((xe=s.consignee)==null?void 0:xe.consignee_contact_email_address)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Address:</span>
              <span class="value">${((ve=s.consignee)==null?void 0:ve.consignee_company_address)||"N/A"}</span>
            </div>
          </div>
        </div>
  
        <div class="section">
          <div class="section-title">SHIPMENT DETAILS</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Description:</span>
              <span class="value">${((je=s.shipment)==null?void 0:je.shipment_description)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Weight:</span>
              <span class="value">${((fe=s.shipment)==null?void 0:fe.shipment_weight)||"0"} kg</span>
            </div>
            <div class="info-item">
              <span class="label">Dimensions:</span>
              <span class="value">${((_e=s.shipment)==null?void 0:_e.shipment_dimension_length)||"0"} x ${((Ce=s.shipment)==null?void 0:Ce.shipment_dimension_width)||"0"} x ${((ye=s.shipment)==null?void 0:ye.shipment_dimension_height)||"0"} cm</span>
            </div>
            <div class="info-item">
              <span class="label">Volume:</span>
              <span class="value">${((be=s.shipment)==null?void 0:be.shipment_volume)||"0"} m³</span>
            </div>
            <div class="info-item">
              <span class="label">Declared Value:</span>
              <span class="value">${p(((Ae=s.shipment)==null?void 0:Ae.shipment_value)||0)}</span>
            </div>
          </div>
        </div>
  
        <div class="section">
          <div class="section-title">VEHICLE DETAILS</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Vehicle Type:</span>
              <span class="value">${((Pe=s.vehicle)==null?void 0:Pe.name)||"N/A"}</span>
            </div>
            <div class="info-item">
              <span class="label">Driver Name:</span>
              <span class="value">${((Re=s.vehicle)==null?void 0:Re.driver_name)||"N/A"}</span>
            </div>
           
            <div class="info-item">
              <span class="label">Vehicle Plate No:</span>
              <span class="value">${((Te=s.vehicle)==null?void 0:Te.plate_no)||"N/A"}</span>
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
    `},n=s=>{const t=h(s),p=window.open("","_blank");p.document.write(t),p.document.close(),p.print()};if(y.filter(s=>!s.isInWarehouse&&s.dispatch!=="Completed").length===0)return e.jsx("div",{className:"text-center d-flex justify-content-center align-items-center",children:e.jsxs(Ne,{color:"warning",className:"w-75",children:[" ","Receiving shipments is done"]})});const l=({icon:s})=>{const[t,p]=i.useState(!1);return e.jsx(L,{icon:s,bounce:t,onMouseEnter:()=>p(!0),onMouseLeave:()=>p(!1)})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mb-3",children:e.jsxs("div",{className:"row align-items-center",children:[e.jsx("div",{className:"col-md-6",children:e.jsx(Ee,{type:"text",className:"mb-2",id:"searchInput2",placeholder:"Search shipments...",value:T,onChange:s=>F(s.target.value)})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"text-end",children:e.jsxs("span",{className:"text-muted",children:["Total Records:"," ",w.filter(s=>!s.isInWarehouse&&s.dispatch!=="Completed").length]})})})]})}),Array.isArray(y)&&y.length>0?e.jsxs(e.Fragment,{children:[e.jsxs(rs,{hover:!0,responsive:!0,children:[e.jsx(os,{className:"text-center",children:e.jsxs($e,{children:[e.jsx(q,{children:"Tracking ID"}),e.jsx(q,{children:"Shipper Address"}),e.jsx(q,{children:"Shipper"}),e.jsx(q,{children:"Consignee"}),e.jsxs(q,{children:[e.jsx(L,{icon:Ue,className:"me-2"}),"Vehicle"]}),e.jsxs(q,{children:[e.jsx(L,{icon:Oe,className:"me-2"}),"Driver"]}),e.jsx(q,{children:"Storage Warehouse"}),e.jsx(q,{children:"Actions"})]})}),e.jsx(ls,{className:"text-center",children:d.filter(s=>!s.isInWarehouse&&s.dispatch!=="Completed").map(s=>{var t,p,m,x,B,J;return e.jsxs($e,{children:[e.jsx(X,{children:s.tracking_id}),e.jsx(X,{children:((t=s.shipper)==null?void 0:t.shipper_company_address)||"N/A"}),e.jsx(X,{children:((p=s.shipper)==null?void 0:p.shipper_company_name)||"N/A"}),e.jsx(X,{children:((m=s.consignee)==null?void 0:m.consignee_company_name)||"N/A"}),e.jsx(X,{children:(x=s.vehicle)!=null&&x.name&&((B=s.vehicle)!=null&&B.plate_no)?e.jsxs(ee,{color:"info",children:[s.vehicle.name," (",s.vehicle.plate_no,")"]}):e.jsx(ee,{color:"secondary",children:"N/A"})}),e.jsx(X,{children:(J=s.vehicle)!=null&&J.driver_name?e.jsx(ee,{color:"info",children:s.vehicle.driver_name}):e.jsx(ee,{color:"secondary",children:"N/A"})}),e.jsx(X,{children:H(s.warehouse_id)}),e.jsx(X,{children:e.jsxs(ds,{children:[e.jsx(hs,{color:"secondary",size:"sm",children:"Actions"}),e.jsx(ps,{children:e.jsxs(V,{children:[e.jsxs(A,{color:"info",variant:"outline",className:"mb-3",onClick:()=>E(s.tracking_id),children:[e.jsx(l,{icon:Xe})," View"]}),e.jsxs(A,{color:"secondary",variant:"outline",className:"mb-3",onClick:()=>n(s),disabled:I||!s.vehicle,children:[e.jsx(l,{icon:Ze})," Print"]}),e.jsx(_s,{shipment:s,onSuccess:O}),e.jsx(Cs,{shipment:s,onSuccess:O})]})})]})})]},s.tracking_id)})})]}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-3",children:[e.jsx("div",{children:e.jsxs("span",{className:"text-muted",children:["Showing ",a+1," to"," ",Math.min(v,w.filter(s=>!s.isInWarehouse&&s.dispatch!=="Completed").length)," ","of"," ",w.filter(s=>!s.isInWarehouse&&s.dispatch!=="Completed").length," ","entries"]})}),e.jsxs(Ke,{"aria-label":"Page navigation",children:[e.jsx(se,{"aria-label":"Previous",disabled:b===1,onClick:()=>k(b-1),children:e.jsx("span",{"aria-hidden":"true",children:"Previous"})}),[...Array(r)].map((s,t)=>e.jsx(se,{active:b===t+1,onClick:()=>k(t+1),children:t+1},t+1)),e.jsx(se,{"aria-label":"Next",disabled:b===r,onClick:()=>k(b+1),children:e.jsx("span",{"aria-hidden":"true",children:"Next"})})]})]})]}):e.jsx(Ne,{color:"success",className:"text-center p-4",children:"No shipment records found"}),e.jsxs(Se,{visible:z,onClose:()=>_(!1),size:"lg",children:[e.jsx(Ie,{closeButton:!0,children:e.jsx("h5",{children:"Shipment Details"})}),e.jsx(De,{children:o&&e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Basic Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tracking ID:"})," ",o.tracking_id]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dispatch Status:"})," ",o.dispatch]})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Shipping Country"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Country:"})," ",o.country]})]})]}),e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Shipper Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(g=o.shipper)==null?void 0:g.shipper_company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(C=o.shipper)==null?void 0:C.shipper_contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(u=o.shipper)==null?void 0:u.shipper_contact_email_address]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(j=o.shipper)==null?void 0:j.shipper_contact_phone_number]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(K=o.shipper)==null?void 0:K.shipper_company_address]})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Consignee Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(Y=o.consignee)==null?void 0:Y.consignee_company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(G=o.consignee)==null?void 0:G.consignee_contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(Q=o.consignee)==null?void 0:Q.consignee_contact_email_address]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(ne=o.consignee)==null?void 0:ne.consignee_contact_phone_number]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(ae=o.consignee)==null?void 0:ae.consignee_company_address]})]})]}),e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-12",children:[e.jsx("h6",{children:"Shipment Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Description:"})," ",(ie=o.shipment)==null?void 0:ie.shipment_description]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Weight:"})," ",(te=o.shipment)==null?void 0:te.shipment_weight," kg"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dimensions:"})," ",(ce=o.shipment)==null?void 0:ce.shipment_dimension_length," x"," ",(re=o.shipment)==null?void 0:re.shipment_dimension_width," x"," ",(oe=o.shipment)==null?void 0:oe.shipment_dimension_height," cm"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Volume:"})," ",(le=o.shipment)==null?void 0:le.shipment_volume," m³"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Value:"})," ",(de=o.shipment)==null?void 0:de.shipment_value]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Instructions:"})," ",(he=o.shipment)==null?void 0:he.shipment_instructions]})]})})]})}),e.jsx(ke,{children:e.jsx(A,{color:"secondary",variant:"outline",onClick:()=>_(!1),children:"Close"})})]})]})},bs=()=>{const{showError:c}=we(),[I,f]=i.useState([]),[P,R]=i.useState([]),[y,S]=i.useState(!0),[T,F]=i.useState(null),[o,W]=i.useState(null),[z,_]=i.useState(""),Z="https://backend-log1.axleshift.com/",[N,$]=i.useState(!1),[D,b]=i.useState(1),[k]=i.useState(10),U=n=>{if(n.photo){const l=`${Z}uploads/pickupReceipts/${n.photo}`;W(l),$(!0)}else c("No receipt image available")};i.useEffect(()=>{O()},[]);const O=async()=>{var n,l,g,C;try{S(!0);const u=await M.get("/api/v1/receiving/all");f(u.data.data)}catch(u){console.error("Error fetching receiving data:",u),F(((l=(n=u==null?void 0:u.response)==null?void 0:n.data)==null?void 0:l.message)||"Error fetching data"),c(((C=(g=u==null?void 0:u.response)==null?void 0:g.data)==null?void 0:C.message)||"Error fetching receiving history")}finally{S(!1)}};i.useEffect(()=>{(async()=>{var l,g,C,u;try{const j=await M.get("/api/v1/warehouseLoc/locations");j.data.data&&R(j.data.data)}catch(j){F((g=(l=j==null?void 0:j.response)==null?void 0:l.data)==null?void 0:g.message),c(((u=(C=j==null?void 0:j.response)==null?void 0:C.data)==null?void 0:u.message)||"Error fetching warehouses")}})()},[]);const H=n=>{if(!P.length)return"Loading...";const l=P.find(g=>g._id===n);return l?l.warehouseName:"N/A"},w=I.filter(n=>{var g,C,u,j,K,Y,G,Q;const l=z.toLowerCase();return((g=n.shipment.tracking_id)==null?void 0:g.toLowerCase().includes(l))||((u=(C=n.shipper)==null?void 0:C.company_name)==null?void 0:u.toLowerCase().includes(l))||((K=(j=n.consignee)==null?void 0:j.company_name)==null?void 0:K.toLowerCase().includes(l))||((G=(Y=n.vehicle)==null?void 0:Y.name)==null?void 0:G.toLowerCase().includes(l))||((Q=n.receiveBy)==null?void 0:Q.toLowerCase().includes(l))}),v=D*k,a=v-k,d=w.slice(a,v),r=Math.ceil(w.length/k),E=n=>{b(n)};if(y)return e.jsx("div",{className:"text-center py-5",children:"Loading..."});const h=({icon:n})=>{const[l,g]=i.useState(!1);return e.jsx(L,{icon:n,bounce:l,onMouseEnter:()=>g(!0),onMouseLeave:()=>g(!1)})};return e.jsxs("div",{className:"container-fluid px-4",children:[e.jsx("h1",{className:"mt-4",children:"Receiving History"}),e.jsx("div",{className:"mb-4",children:e.jsxs("div",{className:"input-group",children:[e.jsx("span",{className:"input-group-text",children:e.jsx(L,{icon:es})}),e.jsx(Ee,{placeholder:"Search by tracking ID, company, receiver...",value:z,id:"searchInput",onChange:n=>_(n.target.value)})]})}),e.jsx("div",{children:e.jsxs("div",{children:[e.jsx(gs,{children:d.map((n,l)=>{var g,C,u,j,K,Y,G,Q,ne,ae,ie,te,ce,re,oe,le,de,he,s,t,p,m,x;return e.jsxs(us,{children:[e.jsx(xs,{children:e.jsxs("div",{className:"d-flex justify-content-between w-100 me-3",children:[e.jsxs("span",{children:[e.jsx(L,{icon:ss,className:"me-2"}),"Tracking ID: ",(g=n.shipment)==null?void 0:g.tracking_id]}),e.jsxs("span",{children:["Received: ",new Date(n.receiveDate).toLocaleDateString()]})]})}),e.jsxs(vs,{children:[e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-md-6",children:e.jsxs(V,{children:[e.jsxs(V,{className:" mb-3",children:[e.jsx(L,{icon:ns,className:"me-2"}),e.jsx("strong",{children:"Shipper Information"})]}),e.jsxs(V,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(C=n.shipper)==null?void 0:C.company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(u=n.shipper)==null?void 0:u.contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(j=n.shipper)==null?void 0:j.email]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(K=n.shipper)==null?void 0:K.phone]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(Y=n.shipper)==null?void 0:Y.address]})]})]})}),e.jsx("div",{className:"col-md-6",children:e.jsxs(V,{children:[e.jsxs(V,{className:"me-2 mb-3",children:[e.jsx(L,{icon:Oe,className:"me-2"}),e.jsx("strong",{children:"Consignee Information"})]}),e.jsxs(V,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(G=n.consignee)==null?void 0:G.company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(Q=n.consignee)==null?void 0:Q.contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(ne=n.consignee)==null?void 0:ne.email]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(ae=n.consignee)==null?void 0:ae.phone]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(ie=n.consignee)==null?void 0:ie.address]})]})]})}),e.jsx(V,{className:"col-md-6",children:e.jsxs(Me,{children:[e.jsxs(Fe,{children:[e.jsx(L,{icon:as,className:"me-2"}),"Shipment Details"]}),e.jsxs(He,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Description:"})," ",(te=n.shipment)==null?void 0:te.description]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Weight:"})," ",(ce=n.shipment)==null?void 0:ce.weight," kg"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dimensions:"})," ",(oe=(re=n.shipment)==null?void 0:re.dimension)==null?void 0:oe.length," x"," ",(de=(le=n.shipment)==null?void 0:le.dimension)==null?void 0:de.width," x ",(s=(he=n.shipment)==null?void 0:he.dimension)==null?void 0:s.height," ","cm"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Warehouse:"})," ",H(n.warehouse_id)]})]})]})}),e.jsx(V,{className:"col-md-6",children:e.jsxs(Me,{children:[e.jsxs(Fe,{children:[e.jsx(L,{icon:Ue,className:"me-2"}),"Vehicle use to transport"]}),e.jsxs(He,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Vehicle:"})," ",(t=n.vehicle)==null?void 0:t.name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Plate No:"})," ",(p=n.vehicle)==null?void 0:p.plate_no]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Driver:"})," ",(m=n.vehicle)==null?void 0:m.driver_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Shipping Type:"})," ",(x=n.shipping)==null?void 0:x.type]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Received By:"})," ",n.receiveBy]})]})]})})]}),e.jsx("div",{className:"text-center mt-3",children:e.jsxs(A,{color:"primary",variant:"outline",className:"me-2",onClick:()=>U(n),children:[e.jsx(h,{icon:is,className:"me-2"}),"Photo"]})})]})]},n._id||l)})}),w.length>k&&e.jsxs(Ke,{className:"mt-4 justify-content-center","aria-label":"Page navigation",children:[e.jsx(se,{onClick:()=>E(D-1),disabled:D===1,children:"Previous"}),[...Array(r)].map((n,l)=>e.jsx(se,{active:D===l+1,onClick:()=>E(l+1),children:l+1},l+1)),e.jsx(se,{onClick:()=>E(D+1),disabled:D===r,children:"Next"})]})]})}),e.jsx(V,{className:"text-center",children:e.jsxs(Se,{visible:N,onClose:()=>{$(!1),W(null)},size:"lg",alignment:"center",children:[e.jsx(Ie,{closeButton:!0,children:"Receipt Image"}),e.jsx(De,{className:"text-center",children:o&&e.jsx(ze,{src:o,alt:"Receipt",style:{maxWidth:"100%",maxHeight:"70vh",objectFit:"contain"},onError:n=>{c("Error loading image"),n.target.src="placeholder-image-url.jpg"}})}),e.jsxs(ke,{children:[e.jsx(A,{color:"secondary",variant:"outline",onClick:()=>{$(!1),W(null)},children:"Close"}),e.jsx("a",{href:o,target:"_blank",rel:"noopener noreferrer",children:e.jsx(A,{color:"primary",variant:"outline",children:"Open in New Tab"})})]})]})}),T&&e.jsx(Ne,{color:"danger",children:T})]})},zs=()=>{const c=Qe(),I=["admin","manager","super admin","warehouse manager","scheduler"],[f,P]=i.useState(0),R=()=>{P(y=>y+1)};return e.jsx(e.Fragment,{children:c&&I.includes(c)?e.jsxs(e.Fragment,{children:[e.jsx("h1",{children:"Receiving Items"}),e.jsxs(js,{activeItemKey:"Receiving",children:[e.jsxs(fs,{variant:"tabs",children:[e.jsx(Be,{itemKey:"Receiving",children:"Receiving"}),e.jsx(Be,{itemKey:"Receiving History",children:"Receiving History"})]}),e.jsxs(ms,{children:[e.jsx(Ve,{className:"p-3",itemKey:"Receiving",children:e.jsx(ys,{onSuccess:R})}),e.jsx(Ve,{className:"p-3",itemKey:"Receiving History",children:e.jsx(bs,{onSuccess:R})})]})]})]}):e.jsx(Ne,{color:"danger",className:"text-center justify-content-center m-5",children:"You do not have permission to access this page."})})};export{zs as default};
