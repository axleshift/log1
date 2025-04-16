import{l as we,r as i,j as e,k as Le,n as $,F as Ye}from"./index-2IovDl7B.js";import{i as Qe,F as L,x as Je,f as Ue,b as Oe,a as ee,y as qe,z as Xe,k as Ze,A as es,B as ss,D as ns,E as as}from"./index-B7PzQgt-.js";import{a as A}from"./CButton-DNHDt1Ae.js";import{C as Se,a as Ie,b as De,c as ke}from"./CModalHeader-QL6xQddx.js";import{C as Ee,a as is}from"./CFormInput-Bwbgls3f.js";import{C as We}from"./CFormSelect-DCSDxsts.js";import{C as ts}from"./CInputGroup-BLRlvFW2.js";import{C as ze}from"./1-VeJfcO3x.js";import{C as Ne}from"./CAlert-CDpDCZkL.js";import{C as cs,a as rs,b as $e,c as q,d as os,e as X}from"./CTable-DLsh0i4V.js";import{b as ls,c as ds,d as hs,a as ps}from"./DefaultLayout-knBeFaoX.js";import{C as B}from"./CContainer-CTwqmJHr.js";import{C as Ke,a as se}from"./CPaginationItem-BNorL7oL.js";import{C as ms,a as gs,b as us,c as xs}from"./CAccordionHeader-DQuUs8YM.js";import{C as Me}from"./CCard-RUBo_MOc.js";import{C as Fe}from"./CCardHeader-DZc7zOpv.js";import{C as He}from"./CCardBody-aqW3Utpd.js";import{C as vs,a as js,b as Be,c as Ve}from"./CTabList-D9z2W-0b.js";import"./index.esm-Dkgisfd2.js";import"./cil-user-Ddrdy7PS.js";import"./getTransitionDurationFromElement-Cpu4p4hx.js";const fs=({shipment:c={},onSuccess:I=()=>{}})=>{const{showError:v,showSuccess:P}=we(),[O,w]=i.useState(!1),[S,R]=i.useState(!1),[M,o]=i.useState([]),[T,z]=i.useState([]),[_,Z]=i.useState(null),[b,W]=i.useState(null),[D,y]=i.useState({items:0,amount:0}),k=async()=>{try{const a=await $.get("api/v1/vehicle");o(a.data.data||[])}catch{v("Error fetching vehicles")}},V=async()=>{try{const a=await $.get("api/v1/warehouseLoc/locations");z(a.data.data||[])}catch{v("Error fetching warehouse locations")}},U=()=>{w(!0),k(),V(),y({items:0,amount:0})},F=()=>{w(!1),Z(null),W(null),y({items:0,amount:0})},N=async()=>{var a,d,r;if(!_){v("Please select a vehicle");return}if(!b){v("Please select a warehouse location");return}R(!0);try{const E={items:parseInt(D.items),type:"public",warehouse_id:b._id,warehouse_name:b.warehouseName,vehicle:{name:_.brand+" "+_.model,plate_no:_.regisNumber,driver_name:((a=_.assignedDriver)==null?void 0:a.driverName)||"No Driver Assigned"}};(await $.put(`https://backend-log2.axleshift.com/api/v1/shipment/${c._id}`,E)).status===200&&(P("Successfully updated warehouse status"),F(),I&&I())}catch(E){v(((r=(d=E==null?void 0:E.response)==null?void 0:d.data)==null?void 0:r.message)||"Error updating warehouse status")}finally{R(!1)}},j=({icon:a})=>{const[d,r]=i.useState(!1);return e.jsx(L,{icon:a,bounce:d,onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs(A,{color:"primary",variant:"outline",className:"mb-3",onClick:U,disabled:c==null?void 0:c.isInWarehouse,children:[e.jsx(j,{icon:Qe})," Warehouse"]}),e.jsxs(Se,{visible:O,onClose:F,backdrop:"static",children:[e.jsx(Ie,{closeButton:!0,children:e.jsx("h5",{children:"Update Warehouse Status"})}),e.jsx(De,{children:e.jsxs("div",{className:"mb-3",children:[e.jsx(Ee,{id:"tracking_id",label:"Tracking ID",type:"text",className:"form-control mb-3",floatingLabel:"Tracking ID",value:(c==null?void 0:c.tracking_id)||"",disabled:!0}),e.jsxs(We,{className:"mb-3",id:"warehouse_id",label:"Select Warehouse Location",floatingLabel:"Select Warehouse Location",value:(b==null?void 0:b._id)||"",onChange:a=>{const d=T.find(r=>r._id===a.target.value);W(d)},children:[e.jsx("option",{value:"",children:"Choose a warehouse location..."}),T.map(a=>e.jsxs("option",{value:a._id,children:[a.warehouseName," - ",a.address]},a._id))]}),e.jsxs(We,{className:"form-select mb-3",id:"vehicle_id",label:"Select Vehicle",floatingLabel:"Select Vehicle",value:(_==null?void 0:_._id)||"",onChange:a=>{const d=M.find(r=>r._id===a.target.value);Z(d)},children:[e.jsx("option",{value:"",children:"Choose a vehicle..."}),M.filter(a=>a.status==="in_use").map(a=>e.jsxs("option",{value:a._id,children:[a.brand," ",a.model," - ",a.regisNumber,a.assignedDriver?` (Driver: ${a.assignedDriver.driverName})`:" (No Driver)"]},a._id))]})]})}),e.jsxs(ke,{children:[e.jsx(A,{color:"secondary",variant:"outline",onClick:F,disabled:S,children:"Cancel"}),e.jsx(A,{color:"primary",variant:"outline",onClick:N,disabled:S||!_||!b,children:S?e.jsxs(e.Fragment,{children:[e.jsx(Le,{size:"sm",className:"me-2"}),"Updating..."]}):"Update Status"})]})]})]})},_s=({shipment:c={},onSuccess:I=()=>{}})=>{var N;const{showError:v,showSuccess:P}=we(),[O,w]=i.useState(!1),[S,R]=i.useState(!1),[M,o]=i.useState([]),[T,z]=i.useState(null),[_,Z]=i.useState(null),[b,W]=i.useState(null),D=()=>{w(!0)},y=()=>{w(!1)},k=j=>{const a=j.target.files[0];if(a){if(!a.type.match("image.*")){v("Please select an image file");return}z(a);const d=new FileReader;d.onloadend=()=>{W(d.result)},d.readAsDataURL(a)}};i.useEffect(()=>{(async()=>{var a,d;try{const r=await $.get("/api/v1/warehouseLoc/locations");r.data.data&&o(r.data.data)}catch(r){setLocalError((a=r==null?void 0:r.response)==null?void 0:a.data.message),v(((d=r==null?void 0:r.response)==null?void 0:d.data.message)||"Error fetching warehouses")}})()},[]);const V=j=>{if(!M.length)return"Loading...";const a=M.find(d=>d._id===j);return a?a.warehouseName:"Not Yet Assigned"},U=async()=>{var j,a,d;if(!(c!=null&&c._id)){v("Invalid shipment data");return}R(!0);try{const r=Ye(),h=(await $.get(`https://backend-log2.axleshift.com/api/v1/shipment/${c._id}`)).data.shipment,n=new FormData;T&&n.append("photo",T);const l={shipper:{company_name:h.shipper.shipper_company_name,contact_name:h.shipper.shipper_contact_name,email:h.shipper.shipper_contact_email_address,phone:h.shipper.shipper_contact_phone_number,address:h.shipper.shipper_company_address},consignee:{company_name:h.consignee.consignee_company_name,contact_name:h.consignee.consignee_contact_name,email:h.consignee.consignee_contact_email_address,phone:h.consignee.consignee_contact_phone_number,address:h.consignee.consignee_company_address},shipment:{description:h.shipment.shipment_description,weight:h.shipment.shipment_weight,dimension:{length:h.shipment.shipment_dimension_length,width:h.shipment.shipment_dimension_width,height:h.shipment.shipment_dimension_height},tracking_id:h.tracking_id,isInWarehouse:!0},vehicle:{name:h.vehicle.name,plate_no:h.vehicle.plate_no,driver_name:h.vehicle.driver_name},warehouse_id:h.warehouse_id,shipping:{type:h.shipping.shipping_type},tracking_id:h.tracking_id,receiveDate:new Date().toISOString(),receiveBy:r};n.append("data",JSON.stringify(l));const g=await $.post("api/v1/receiving/add",n,{headers:{"Content-Type":"multipart/form-data"}}),C=await $.put(`https://backend-log2.axleshift.com/api/v1/shipment/${c._id}`,{isInWarehouse:!0,vehicle:{name:null,plate_no:null,driver_name:null}});g.status===201&&C.status===200&&(P("Shipment completed and copied to receiving successfully"),y(),I&&I())}catch(r){console.error("Error details:",(j=r.response)==null?void 0:j.data),v(((d=(a=r==null?void 0:r.response)==null?void 0:a.data)==null?void 0:d.message)||"Error completing shipment")}finally{R(!1)}};if((c==null?void 0:c.paid)==="Paid")return null;const F=({icon:j})=>{const[a,d]=i.useState(!1);return e.jsx(L,{icon:j,bounce:a,onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1)})};return e.jsxs(e.Fragment,{children:[e.jsxs(A,{className:"mb-2",color:"success",variant:"outline",onClick:D,disabled:S||!((N=c==null?void 0:c.vehicle)!=null&&N.name),children:[e.jsx(F,{icon:Je,className:"me-1"})," Complete"]}),e.jsxs(Se,{visible:O,onClose:y,backdrop:"static",children:[e.jsx(Ie,{closeButton:!0,children:e.jsx("h5",{children:"Complete Shipment"})}),e.jsx(De,{children:e.jsxs("div",{className:"mb-3",children:[e.jsx("h6",{children:"Shipment Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tracking ID:"})," ",c==null?void 0:c.tracking_id]}),e.jsx(is,{htmlFor:"receipt",children:"Picture Of Receipts"}),e.jsx(ts,{className:"mb-3",children:e.jsx(Ee,{type:"file",id:"receipt",accept:"images/*",onChange:k})}),b&&e.jsx("div",{className:"mb-3",children:e.jsx(ze,{src:b,rounded:!0,align:"center",alt:"Receipts",width:200,height:200})}),e.jsx("div",{className:"alert alert-info mt-3",children:e.jsxs("small",{children:[e.jsx("strong",{children:"Note:"})," This action will:",e.jsx("ul",{className:"mb-0",children:e.jsxs("li",{children:["Store to warehouse “",V(c==null?void 0:c.warehouse_id),"“"]})})]})})]})}),e.jsxs(ke,{children:[e.jsx(A,{color:"secondary",variant:"outline",className:"mb-3",onClick:y,disabled:S,children:"Cancel"}),e.jsx(A,{className:"mb-3",color:"primary",variant:"outline",onClick:U,disabled:S||!b,children:S?e.jsxs(e.Fragment,{children:[e.jsx(Le,{size:"sm",className:"me-2"}),"Completing..."]}):"Complete Shipment"})]})]})]})},Cs=()=>{var g,C,u,f,K,G,Y,Q,ne,ae,ie,te,ce,re,oe,le,de,he;const{showError:c}=we(),[I,v]=i.useState(!1),[P,O]=i.useState(null),[w,S]=i.useState([]),[R,M]=i.useState(""),[o,T]=i.useState(null),[z,_]=i.useState(!1),[Z,b]=i.useState(!1),[W,D]=i.useState([]),[y,k]=i.useState(1),[V]=i.useState(10),U=async()=>{var s,t,p,m;v(!0);try{const x=await $.get("https://backend-log2.axleshift.com/api/v1/shipment");if(x.status===200){const H=x.data.shipments||[];S(H),O(null)}}catch(x){O(((t=(s=x==null?void 0:x.response)==null?void 0:s.data)==null?void 0:t.message)||"Error fetching data"),c(((m=(p=x==null?void 0:x.response)==null?void 0:p.data)==null?void 0:m.message)||"Error fetching data")}finally{v(!1)}};i.useEffect(()=>{(async()=>{var t,p;try{const m=await $.get("/api/v1/warehouseLoc/locations");m.data.data&&D(m.data.data)}catch(m){setLocalError((t=m==null?void 0:m.response)==null?void 0:t.data.message),c(((p=m==null?void 0:m.response)==null?void 0:p.data.message)||"Error fetching warehouses")}})()},[]);const F=s=>{if(!W.length)return"Loading...";const t=W.find(p=>p._id===s);return t?e.jsx(ee,{color:"success",children:t.warehouseName}):e.jsx(ee,{color:"danger",children:"Not Yet Assigned"})},N=w.filter(s=>{var p,m,x,H,J,pe,me,ge,ue,xe,ve,je,fe,_e,Ce,ye,be;const t=R.toLowerCase();return((p=s.tracking_id)==null?void 0:p.toLowerCase().includes(t))||((x=(m=s.shipper)==null?void 0:m.shipper_company_name)==null?void 0:x.toLowerCase().includes(t))||((J=(H=s.consignee)==null?void 0:H.consignee_company_name)==null?void 0:J.toLowerCase().includes(t))||((pe=s.type)==null?void 0:pe.toLowerCase().includes(t))||((me=s.dispatch)==null?void 0:me.toLowerCase().includes(t))||((ge=s.paid)==null?void 0:ge.toLowerCase().includes(t))||((xe=(ue=s.vehicle)==null?void 0:ue.driver_name)==null?void 0:xe.toLowerCase().includes(t))||((je=(ve=s.vehicle)==null?void 0:ve.vehicle_plate_no)==null?void 0:je.toLowerCase().includes(t))||((_e=(fe=s.vehicle)==null?void 0:fe.name)==null?void 0:_e.toLowerCase().includes(t))||((ye=(Ce=s.vehicle)==null?void 0:Ce.plate_no)==null?void 0:ye.toLowerCase().includes(t))||((be=F(s.warehouse_id))==null?void 0:be.toLowerCase().includes(t))}),j=y*V,a=j-V,d=N.slice(a,j),r=Math.ceil(N.length/V),E=s=>{try{const t=w.find(p=>p.tracking_id===s);T(t),_(!0)}catch{c("Error viewing shipment details")}};if(i.useEffect(()=>{U()},[]),I)return e.jsx("div",{className:"d-flex justify-content-center p-4",children:e.jsx(Le,{})});if(P)return e.jsx(Ne,{color:"danger",className:"text-center p-4",children:P});const h=s=>{var m,x,H,J,pe,me,ge,ue,xe,ve,je,fe,_e,Ce,ye,be,Ae,Pe,Re,Te;const t=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),p=Ge=>new Intl.NumberFormat("en-US",{style:"currency",currency:"PHP"}).format(Ge);return`
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
              <span class="value">${((H=s.shipper)==null?void 0:H.shipper_contact_phone_number)||"N/A"}</span>
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
    `},n=s=>{const t=h(s),p=window.open("","_blank");p.document.write(t),p.document.close(),p.print()};if(w.filter(s=>!s.isInWarehouse&&s.dispatch!=="Completed").length===0)return e.jsx("div",{className:"text-center d-flex justify-content-center align-items-center",children:e.jsxs(Ne,{color:"warning",className:"w-75",children:[" ","Receiving shipments is done"]})});const l=({icon:s})=>{const[t,p]=i.useState(!1);return e.jsx(L,{icon:s,bounce:t,onMouseEnter:()=>p(!0),onMouseLeave:()=>p(!1)})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mb-3",children:e.jsxs("div",{className:"row align-items-center",children:[e.jsx("div",{className:"col-md-6",children:e.jsx(Ee,{type:"text",className:"mb-2",id:"searchInput2",placeholder:"Search shipments...",value:R,onChange:s=>M(s.target.value)})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"text-end",children:e.jsxs("span",{className:"text-muted",children:["Total Records:"," ",N.filter(s=>!s.isInWarehouse&&s.dispatch!=="Completed").length]})})})]})}),Array.isArray(w)&&w.length>0?e.jsxs(e.Fragment,{children:[e.jsxs(cs,{hover:!0,responsive:!0,children:[e.jsx(rs,{className:"text-center",children:e.jsxs($e,{children:[e.jsx(q,{children:"Tracking ID"}),e.jsx(q,{children:"Shipper Address"}),e.jsx(q,{children:"Shipper"}),e.jsx(q,{children:"Consignee"}),e.jsxs(q,{children:[e.jsx(L,{icon:Ue,className:"me-2"}),"Vehicle"]}),e.jsxs(q,{children:[e.jsx(L,{icon:Oe,className:"me-2"}),"Driver"]}),e.jsx(q,{children:"Storage Warehouse"}),e.jsx(q,{children:"Actions"})]})}),e.jsx(os,{className:"text-center",children:d.filter(s=>!s.isInWarehouse&&s.dispatch!=="Completed").map(s=>{var t,p,m,x,H,J;return e.jsxs($e,{children:[e.jsx(X,{children:s.tracking_id}),e.jsx(X,{children:((t=s.shipper)==null?void 0:t.shipper_company_address)||"N/A"}),e.jsx(X,{children:((p=s.shipper)==null?void 0:p.shipper_company_name)||"N/A"}),e.jsx(X,{children:((m=s.consignee)==null?void 0:m.consignee_company_name)||"N/A"}),e.jsx(X,{children:(x=s.vehicle)!=null&&x.name&&((H=s.vehicle)!=null&&H.plate_no)?e.jsxs(ee,{color:"info",children:[s.vehicle.name," (",s.vehicle.plate_no,")"]}):e.jsx(ee,{color:"secondary",children:"N/A"})}),e.jsx(X,{children:(J=s.vehicle)!=null&&J.driver_name?e.jsx(ee,{color:"info",children:s.vehicle.driver_name}):e.jsx(ee,{color:"secondary",children:"N/A"})}),e.jsx(X,{children:F(s.warehouse_id)}),e.jsx(X,{children:e.jsxs(ls,{children:[e.jsx(ds,{color:"secondary",size:"sm",children:"Actions"}),e.jsx(hs,{children:e.jsxs(B,{children:[e.jsxs(A,{color:"info",variant:"outline",className:"mb-3",onClick:()=>E(s.tracking_id),children:[e.jsx(l,{icon:qe})," View"]}),e.jsxs(A,{color:"secondary",variant:"outline",className:"mb-3",onClick:()=>n(s),disabled:I||!s.vehicle,children:[e.jsx(l,{icon:Xe})," Print"]}),e.jsx(fs,{shipment:s,onSuccess:U}),e.jsx(_s,{shipment:s,onSuccess:U})]})})]})})]},s.tracking_id)})})]}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-3",children:[e.jsx("div",{children:e.jsxs("span",{className:"text-muted",children:["Showing ",a+1," to"," ",Math.min(j,N.filter(s=>!s.isInWarehouse&&s.dispatch!=="Completed").length)," ","of"," ",N.filter(s=>!s.isInWarehouse&&s.dispatch!=="Completed").length," ","entries"]})}),e.jsxs(Ke,{"aria-label":"Page navigation",children:[e.jsx(se,{"aria-label":"Previous",disabled:y===1,onClick:()=>k(y-1),children:e.jsx("span",{"aria-hidden":"true",children:"Previous"})}),[...Array(r)].map((s,t)=>e.jsx(se,{active:y===t+1,onClick:()=>k(t+1),children:t+1},t+1)),e.jsx(se,{"aria-label":"Next",disabled:y===r,onClick:()=>k(y+1),children:e.jsx("span",{"aria-hidden":"true",children:"Next"})})]})]})]}):e.jsx(Ne,{color:"success",className:"text-center p-4",children:"No shipment records found"}),e.jsxs(Se,{visible:z,onClose:()=>_(!1),size:"lg",children:[e.jsx(Ie,{closeButton:!0,children:e.jsx("h5",{children:"Shipment Details"})}),e.jsx(De,{children:o&&e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Basic Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tracking ID:"})," ",o.tracking_id]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dispatch Status:"})," ",o.dispatch]})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Shipping Country"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Country:"})," ",o.country]})]})]}),e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Shipper Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(g=o.shipper)==null?void 0:g.shipper_company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(C=o.shipper)==null?void 0:C.shipper_contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(u=o.shipper)==null?void 0:u.shipper_contact_email_address]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(f=o.shipper)==null?void 0:f.shipper_contact_phone_number]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(K=o.shipper)==null?void 0:K.shipper_company_address]})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("h6",{children:"Consignee Information"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(G=o.consignee)==null?void 0:G.consignee_company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(Y=o.consignee)==null?void 0:Y.consignee_contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(Q=o.consignee)==null?void 0:Q.consignee_contact_email_address]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(ne=o.consignee)==null?void 0:ne.consignee_contact_phone_number]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(ae=o.consignee)==null?void 0:ae.consignee_company_address]})]})]}),e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-12",children:[e.jsx("h6",{children:"Shipment Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Description:"})," ",(ie=o.shipment)==null?void 0:ie.shipment_description]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Weight:"})," ",(te=o.shipment)==null?void 0:te.shipment_weight," kg"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dimensions:"})," ",(ce=o.shipment)==null?void 0:ce.shipment_dimension_length," x"," ",(re=o.shipment)==null?void 0:re.shipment_dimension_width," x"," ",(oe=o.shipment)==null?void 0:oe.shipment_dimension_height," cm"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Volume:"})," ",(le=o.shipment)==null?void 0:le.shipment_volume," m³"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Value:"})," ",(de=o.shipment)==null?void 0:de.shipment_value]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Instructions:"})," ",(he=o.shipment)==null?void 0:he.shipment_instructions]})]})})]})}),e.jsx(ke,{children:e.jsx(A,{color:"secondary",variant:"outline",onClick:()=>_(!1),children:"Close"})})]})]})},ys=()=>{const{showError:c}=we(),[I,v]=i.useState([]),[P,O]=i.useState([]),[w,S]=i.useState(!0),[R,M]=i.useState(null),[o,T]=i.useState(null),[z,_]=i.useState(""),Z="http://localhost:5057/",[b,W]=i.useState(!1),[D,y]=i.useState(1),[k]=i.useState(10),V=n=>{if(n.photo){const l=`${Z}uploads/pickupReceipts/${n.photo}`;T(l),W(!0)}else c("No receipt image available")};i.useEffect(()=>{U()},[]);const U=async()=>{var n,l,g,C;try{S(!0);const u=await $.get("/api/v1/receiving/all");v(u.data.data)}catch(u){console.error("Error fetching receiving data:",u),M(((l=(n=u==null?void 0:u.response)==null?void 0:n.data)==null?void 0:l.message)||"Error fetching data"),c(((C=(g=u==null?void 0:u.response)==null?void 0:g.data)==null?void 0:C.message)||"Error fetching receiving history")}finally{S(!1)}};i.useEffect(()=>{(async()=>{var l,g,C,u;try{const f=await $.get("/api/v1/warehouseLoc/locations");f.data.data&&O(f.data.data)}catch(f){M((g=(l=f==null?void 0:f.response)==null?void 0:l.data)==null?void 0:g.message),c(((u=(C=f==null?void 0:f.response)==null?void 0:C.data)==null?void 0:u.message)||"Error fetching warehouses")}})()},[]);const F=n=>{if(!P.length)return"Loading...";const l=P.find(g=>g._id===n);return l?l.warehouseName:"N/A"},N=I.filter(n=>{var g,C,u,f,K,G,Y,Q;const l=z.toLowerCase();return((g=n.shipment.tracking_id)==null?void 0:g.toLowerCase().includes(l))||((u=(C=n.shipper)==null?void 0:C.company_name)==null?void 0:u.toLowerCase().includes(l))||((K=(f=n.consignee)==null?void 0:f.company_name)==null?void 0:K.toLowerCase().includes(l))||((Y=(G=n.vehicle)==null?void 0:G.name)==null?void 0:Y.toLowerCase().includes(l))||((Q=n.receiveBy)==null?void 0:Q.toLowerCase().includes(l))}),j=D*k,a=j-k,d=N.slice(a,j),r=Math.ceil(N.length/k),E=n=>{y(n)};if(w)return e.jsx("div",{className:"text-center py-5",children:"Loading..."});const h=({icon:n})=>{const[l,g]=i.useState(!1);return e.jsx(L,{icon:n,bounce:l,onMouseEnter:()=>g(!0),onMouseLeave:()=>g(!1)})};return e.jsxs("div",{className:"container-fluid px-4",children:[e.jsx("h1",{className:"mt-4",children:"Receiving History"}),e.jsx("div",{className:"mb-4",children:e.jsxs("div",{className:"input-group",children:[e.jsx("span",{className:"input-group-text",children:e.jsx(L,{icon:Ze})}),e.jsx(Ee,{placeholder:"Search by tracking ID, company, receiver...",value:z,id:"searchInput",onChange:n=>_(n.target.value)})]})}),e.jsx("div",{children:e.jsxs("div",{children:[e.jsx(ms,{children:d.map((n,l)=>{var g,C,u,f,K,G,Y,Q,ne,ae,ie,te,ce,re,oe,le,de,he,s,t,p,m,x;return e.jsxs(gs,{children:[e.jsx(us,{children:e.jsxs("div",{className:"d-flex justify-content-between w-100 me-3",children:[e.jsxs("span",{children:[e.jsx(L,{icon:es,className:"me-2"}),"Tracking ID: ",(g=n.shipment)==null?void 0:g.tracking_id]}),e.jsxs("span",{children:["Received: ",new Date(n.receiveDate).toLocaleDateString()]})]})}),e.jsxs(xs,{children:[e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-md-6",children:e.jsxs(B,{children:[e.jsxs(B,{className:" mb-3",children:[e.jsx(L,{icon:ss,className:"me-2"}),e.jsx("strong",{children:"Shipper Information"})]}),e.jsxs(B,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(C=n.shipper)==null?void 0:C.company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(u=n.shipper)==null?void 0:u.contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(f=n.shipper)==null?void 0:f.email]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(K=n.shipper)==null?void 0:K.phone]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(G=n.shipper)==null?void 0:G.address]})]})]})}),e.jsx("div",{className:"col-md-6",children:e.jsxs(B,{children:[e.jsxs(B,{className:"me-2 mb-3",children:[e.jsx(L,{icon:Oe,className:"me-2"}),e.jsx("strong",{children:"Consignee Information"})]}),e.jsxs(B,{className:"card-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Company:"})," ",(Y=n.consignee)==null?void 0:Y.company_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact:"})," ",(Q=n.consignee)==null?void 0:Q.contact_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(ne=n.consignee)==null?void 0:ne.email]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(ae=n.consignee)==null?void 0:ae.phone]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",(ie=n.consignee)==null?void 0:ie.address]})]})]})}),e.jsx(B,{className:"col-md-6",children:e.jsxs(Me,{children:[e.jsxs(Fe,{children:[e.jsx(L,{icon:ns,className:"me-2"}),"Shipment Details"]}),e.jsxs(He,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Description:"})," ",(te=n.shipment)==null?void 0:te.description]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Weight:"})," ",(ce=n.shipment)==null?void 0:ce.weight," kg"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Dimensions:"})," ",(oe=(re=n.shipment)==null?void 0:re.dimension)==null?void 0:oe.length," x"," ",(de=(le=n.shipment)==null?void 0:le.dimension)==null?void 0:de.width," x ",(s=(he=n.shipment)==null?void 0:he.dimension)==null?void 0:s.height," ","cm"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Warehouse:"})," ",F(n.warehouse_id)]})]})]})}),e.jsx(B,{className:"col-md-6",children:e.jsxs(Me,{children:[e.jsxs(Fe,{children:[e.jsx(L,{icon:Ue,className:"me-2"}),"Vehicle use to transport"]}),e.jsxs(He,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Vehicle:"})," ",(t=n.vehicle)==null?void 0:t.name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Plate No:"})," ",(p=n.vehicle)==null?void 0:p.plate_no]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Driver:"})," ",(m=n.vehicle)==null?void 0:m.driver_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Shipping Type:"})," ",(x=n.shipping)==null?void 0:x.type]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Received By:"})," ",n.receiveBy]})]})]})})]}),e.jsx("div",{className:"text-center mt-3",children:e.jsxs(A,{color:"primary",variant:"outline",className:"me-2",onClick:()=>V(n),children:[e.jsx(h,{icon:as,className:"me-2"}),"Photo"]})})]})]},n._id||l)})}),N.length>k&&e.jsxs(Ke,{className:"mt-4 justify-content-center","aria-label":"Page navigation",children:[e.jsx(se,{onClick:()=>E(D-1),disabled:D===1,children:"Previous"}),[...Array(r)].map((n,l)=>e.jsx(se,{active:D===l+1,onClick:()=>E(l+1),children:l+1},l+1)),e.jsx(se,{onClick:()=>E(D+1),disabled:D===r,children:"Next"})]})]})}),e.jsx(B,{className:"text-center",children:e.jsxs(Se,{visible:b,onClose:()=>{W(!1),T(null)},size:"lg",alignment:"center",children:[e.jsx(Ie,{closeButton:!0,children:"Receipt Image"}),e.jsx(De,{className:"text-center",children:o&&e.jsx(ze,{src:o,alt:"Receipt",style:{maxWidth:"100%",maxHeight:"70vh",objectFit:"contain"},onError:n=>{c("Error loading image"),n.target.src="placeholder-image-url.jpg"}})}),e.jsxs(ke,{children:[e.jsx(A,{color:"secondary",variant:"outline",onClick:()=>{W(!1),T(null)},children:"Close"}),e.jsx("a",{href:o,target:"_blank",rel:"noopener noreferrer",children:e.jsx(A,{color:"primary",variant:"outline",children:"Open in New Tab"})})]})]})}),R&&e.jsx(Ne,{color:"danger",children:R})]})},Os=()=>{const[c,I]=i.useState(0),v=()=>{I(P=>P+1)};return e.jsxs(e.Fragment,{children:[e.jsx("h1",{children:"Receiving Items"}),e.jsxs(vs,{activeItemKey:"Receiving",children:[e.jsxs(js,{variant:"tabs",children:[e.jsx(Be,{itemKey:"Receiving",children:"Receiving"}),e.jsx(Be,{itemKey:"Receiving History",children:"Receiving History"})]}),e.jsxs(ps,{children:[e.jsx(Ve,{className:"p-3",itemKey:"Receiving",children:e.jsx(Cs,{onSuccess:v})}),e.jsx(Ve,{className:"p-3",itemKey:"Receiving History",children:e.jsx(ys,{onSuccess:v})})]})]})]})};export{Os as default};
