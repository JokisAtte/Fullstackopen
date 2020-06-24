(this["webpackJsonp2.6"]=this["webpackJsonp2.6"]||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),c=t.n(a),o=t(13),u=t.n(o),r=t(14),l=t(2),i=(t(20),t(3)),m=t.n(i),s="http://localhost:3001/api/persons",d=function(){return m.a.get(s)},f=function(e){return m.a.post(s,e)},h=function(e,n){return m.a.put("".concat(s,"/").concat(e),n)},p=function(e){return m.a.delete("".concat(s,"/").concat(e))},b=function(e){return c.a.createElement("p",null,e.name," ",e.phone,c.a.createElement(E,{id:e.id,name:e.name,del:e.del}))},E=function(e){return c.a.createElement("button",{onClick:function(){e.del(e)}},"delete")},v=function(e){var n=e.message;return""===n?null:c.a.createElement("div",{className:"notification"},n)},g=function(e){var n=e.message;return""===n?null:c.a.createElement("div",{className:"error"},n)},j=function(e){var n=e.persons.filter((function(n){return!0===n.name.toUpperCase().includes(e.search.toUpperCase())}));return c.a.createElement("div",null,c.a.createElement("h2",null,"Numbers"),n.map((function(n){return c.a.createElement(b,{key:n.name,id:n.id,name:n.name,phone:n.number,del:e.del})})))},O=function(e){return c.a.createElement("div",null,"filter shown with: ",c.a.createElement("input",{value:e.newSearch,onChange:e.onChange}))},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),i=Object(l.a)(u,2),m=i[0],s=i[1],b=Object(a.useState)(""),E=Object(l.a)(b,2),w=E[0],S=E[1],C=Object(a.useState)(""),k=Object(l.a)(C,2),y=k[0],T=k[1],N=Object(a.useState)(""),D=Object(l.a)(N,2),J=D[0],U=D[1],x=Object(a.useState)(""),B=Object(l.a)(x,2),I=B[0],P=B[1];Object(a.useEffect)((function(){d().then((function(e){o(e.data)}))}),[]);return c.a.createElement("div",null,c.a.createElement(v,{message:J}),c.a.createElement(g,{message:I}),c.a.createElement("h2",null,"Phonebook"),c.a.createElement(O,{value:y,onChange:function(e){T(e.target.value)}}),c.a.createElement("h2",null,"add a new"),c.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n={name:m,number:w};if(t.map((function(e){return e.name})).includes(m)){if(window.confirm("".concat(m," is already added to phonebook. Replace the old number with new one?"))){var a=t.find((function(e){return e.name===m})),c=Object(r.a)({},a,{number:w});h(a.id,c).then((function(e){o(t.map((function(n){return n.id!==c.id?n:e.data})))})),U("".concat(n.name,"'s number updated")),setTimeout((function(){U("")}),3e3)}}else console.log("lis\xe4t\xe4\xe4n ",n),f(n).then((function(e){console.log("Setting persons to:"),console.log(t.concat(n)),o(t.concat(n))})),U("".concat(n.name," added")),setTimeout((function(){U("")}),3e3);s(""),S("")}},c.a.createElement("div",null,"name: ",c.a.createElement("input",{value:m,onChange:function(e){s(e.target.value)}})),c.a.createElement("div",null,"number: ",c.a.createElement("input",{value:w,onChange:function(e){S(e.target.value)}})),c.a.createElement("div",null,c.a.createElement("button",{type:"submit"},"add"))),c.a.createElement(j,{persons:t,search:y,del:function(e){window.confirm("Delete ".concat(e.name,"?"))&&(p(e.id).then((function(){d().then((function(e){o(e.data)})),U("".concat(e.name," deleted"))})).catch((function(n){P("information of ".concat(e.name," has already been deleted from the server")),setTimeout((function(){P("")}),3e3)})),setTimeout((function(){U("")}),3e3))}}))};u.a.render(c.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.3d71ae6c.chunk.js.map