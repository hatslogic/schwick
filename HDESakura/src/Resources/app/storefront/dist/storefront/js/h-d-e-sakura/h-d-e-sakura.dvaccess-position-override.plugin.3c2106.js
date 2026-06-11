"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[15292],{292(t,s,e){e.r(s),e.d(s,{default:()=>o});class o extends window.PluginBaseClass{static #t=this.options={left:"20px",bottom:"24px",maxAttempts:50,retryDelayMs:200};init(){this._attempt=0,this._tryApply()}_tryApply(){!this._injectStyles()&&(this._attempt+=1,this._attempt>=this.options.maxAttempts||window.setTimeout(()=>this._tryApply(),this.options.retryDelayMs))}_injectStyles(){let t=document.querySelector(".dvaccess-shadow-root");if(!t?.shadowRoot)return!1;let s="hde-dvaccess-position-override";if(!t.shadowRoot.getElementById(s)){let e=document.createElement("style");e.id=s,e.textContent=`
                .dvaccess .dvaccess-toggle {
                    left: ${this.options.left} !important;
                    right: auto !important;
                    bottom: ${this.options.bottom} !important;
                    top: auto !important;
                    transform: none !important;
                }
            `,t.shadowRoot.appendChild(e)}let e=t.shadowRoot.querySelector(".dvaccess");return!!e&&(e.classList.forEach(t=>{t.startsWith("dvaccess-pos-")&&e.classList.remove(t)}),e.classList.add("dvaccess-pos-lb"),!0)}}}}]);