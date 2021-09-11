import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './Form.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'contact',
    subject: 'HTDDM Query', // optional subject of the notification email
    action: '/contact/',
    successMessage: 'Thanks for your enquiry, we will get back to you soon',
    errorMessage: 'There is a problem, your message has not been sent, please try contacting us via email'
  }

  state = {
		names:{},
    alert: '',
    disabled: false
  }

	handleChange = (e) => {
    this.setState({ ...this.state.names, [e.target.name]: e.target.value })
  }
	
	encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.disabled) return;
	
    const form = e.target;
    
    this.setState({ disabled: true });

		
		{/*
			const data = serialize(form);
    fetch(form.action + '?' + stringify(data), {
      method: 'POST',
	  	headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString()
    })*/}

		fetch("/", { 
      method: 'POST',
	  	headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
				"form-name": form.getAttribute("name"),
				...this.state.names
			})
    }).then(res => {
        if (res.ok) {
          return res;
        } else {
          throw new Error('Network error');
        }
      })
      .then(() => {
				console.log('Form successfully submitted');
        form.reset();
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err);
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  render() {
    const { name, subject, action } = this.props

    return (
      <Fragment>
        <Helmet>
          
        </Helmet>
		<script src="https://www.google.com/recaptcha/api.js" ></script>
        <form
					method="post"
          className="Form"
          name={name}
          action={action}
          onSubmit={this.handleSubmit}
          data-netlify="true"
          data-netlify-recaptcha="true"
		  		data-netlify-honeypot="bot-field"
        >
          {this.state.alert && (
            <div className="Form--Alert">{this.state.alert}</div>
          )}
          <div className="Form--Group">
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Firstname"
                name="firstname"
                required
								onChange={this.handleChange}
              />
              <span>Firstname</span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Lastname"
                name="lastname"
                required
								onChange={this.handleChange}
              />
              <span>Lastname</span>
            </label>
          </div>
          <fieldset>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="gender"
                value="male"
                defaultChecked
								onChange={this.handleChange}
              />
              <span>Male</span>
            </label>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="gender"
                value="female"
								onChange={this.handleChange}
              />
              <span>Female</span>
            </label>
          </fieldset>
          <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="email"
              placeholder="Email"
              name="emailAddress"
              required
							onChange={this.handleChange}
            />
            <span>Email address</span>
          </label>
          <label className="Form--Label has-arrow">
            <select
              className="Form--Input Form--Select"
              name="type"
              defaultValue="Type of Enquiry"
              required
							onChange={this.handleChange}
            >
              <option disabled hidden>
              Type of Plan to more about
              </option>
              <option>Unstoppable ENTREPRENEUR</option>
              <option>Mastermind 360 DIGITAL MARKETING</option>
              <option>PREMIUM DIGITAL MARKETING</option>
            </select>
          </label>
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Message"
              name="message"
              rows="10"
              required
							onChange={this.handleChange}
            />
            <span>Message</span>
          </label>
         {/* <label className="Form--Label Form-Checkbox">
            <input
              className="Form--Input Form--Textarea Form--CheckboxInput"
              name="newsletter"
              type="checkbox"
							onChange={this.handleChange}
            />
            <span>Get news updates</span>
          </label>*/}
          <div
            className="g-recaptcha"
            data-sitekey="6LfP01wcAAAAAJg6jgTdFFdl0DocIwYP8x_Jqrfb"
          />
		  <p class="hidden" style={{ display: 'none' }}>
    		<label>Don’t fill this out if you’re human: <input type="text" name="bot-field" onChange={this.handleChange} /></label>
  		  </p>
          {!!subject && <input type="hidden" name="subject" value={subject} onChange={this.handleChange} />}
          <input type="hidden" name="form-name" value={name} onChange={this.handleChange} />
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="Enquire"
            disabled={this.state.disabled}
						
          />
        </form>
      </Fragment>
    )
  }
}

export default Form
