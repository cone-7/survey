
import React, { Component } from 'react';
import styles from '../styles/main.module.css';
import apiService from '../services/apiService'

class Form extends Component {

    constructor(props){
        super(props)
        this.state = {
            sections: this.props.config.sections,
            fields: this.props.config.fields,
            fieldsResponse: this.props.config.fields.map((field) => {
                field = '';
                return field;
            })
        }
        this.apiService = new apiService();
    }

    createSections () {
        return this.state.sections.map((section, index) => {
            return (
                <div key={index}>
                    <h2 >{ section.sectionKey } </h2>
                    {this.createInputs(section.sectionKey) }
                </div>
            )
        });
    }

    createInputs( sectionKey ) {
        return this.state.fields.map((field, index) => {
            if(field.section === sectionKey){
                switch (field.dataType) {
                    case 'checkbox':
                        return this.createInput_checkbox(index, field);
                    case 'radio':
                        return this.createInput_radio(index, field);
                    case 'select':
                        return this.createInput_select(index, field);
                    case 'textarea':
                        return this.createInput_textarea(index, field);
                    case 'text':
                        return this.createInput_text(index, field);
                    default:
                        return this.createInput_default(index, field);
                }
            }
        })
    }

    createInput_checkbox (i, field) {
        return (
            <div className={styles.inputDiv} key={i}>
                <label>
                    {field.label }:
                </label>
                <small >{ field.helptext }</small>
                { this.createOptions_checkbox(field)}
            </div>
        );
    }

    createOptions_checkbox (field) {
        if(field.fieldOptions){
            return field.fieldOptions.map((option, index) => {
                return (
                    <div key={index}>
                        <input type="checkbox" id={field.fieldKey} value={option} name={field.fieldKey}/>
                        <label  htmlFor={field.fieldKey + index} id={field.fieldKey} onClick={this.handleChange}> {option} </label>
                    </div>
                )
            });
        }
    }

    createInput_radio (i, field) {
        return (
            <div className={styles.inputDiv} key={i}>
                <label >
                    { field.label }:
                </label>
                <small >{ field.helptext } </small>
                { this.createOptions_radio(field) }
            </div>
        );
    }

    createOptions_radio (field) {
        const fieldsResponse = this.state.fieldsResponse[field.fieldKey];
        return field.fieldOptions.map((option, i) => {
            const isSelected = fieldsResponse === option;
            return (
                <div className={styles.inputDiv} key={i}>
                    <input 
                        type="radio"
                        value={option}
                        id={field.fieldKey}
                        name={field.fieldKey}
                        checked={isSelected}
                        onChange={this.handleChange}
                        />
                    <label onClick={this.handleChange} id={field.fieldKey} htmlFor={field.fieldKey}>
                        { option }
                    </label>
                </div>
            )
        });
    }

    createInput_select (i, field) {
        return (
            <div className={styles.inputDiv} key={i}>
                <legend >
                     <label>
                        {field.label}:
                    </label>
                </legend>
                <small >{field.helptext}</small>
                <select  id={field.fieldKey} onChange={this.handleChange}>
                   { this.createOptions_selects(field.fieldOptions)}
                </select>
            </div>
        );
    }

    createOptions_selects(options) {
        return options.map( (option, i) => (<option key={i}>{option}</option>) );
    }

    createInput_textarea (i, field) {
        return (
            <div className={styles.inputDiv} key={i}>
                <label htmlFor={field.fieldKey}>
                    {field.label}:
                </label>
                <textarea id={field.fieldKey} name={field.fieldKey} onChange={this.handleChange} placeholder="" row="3">
                </textarea>
                <small >{field.helptext}</small>
            </div>
        );
    }

    createInput_text(i, field) {
        return (
            <div className={styles.inputDiv} key={i} onClick={this.handleChange}>
                <label htmlFor={field.fieldKey}>
                    {field.label}:
                </label>
                <input type="text" id={field.fieldKey} name={field.fieldKey} placeholder=""/>
                <small >{field.helptext}</small>
            </div>
        );
    }

    createInput_default (i, field) {
        return (
            <div className={styles.inputDiv} key={i}>
                <label htmlFor={field.fieldKey}>
                    { field.label }:
                </label>
                <input type={field.dataType} id={field.fieldKey} name={field.fieldKey} onChange={this.handleChange} placeholder=""/>
                <small >{field.helptext }</small>
            </div>
        );
       
    }

    getField = (key) => {
        return this.state.fields.filter(field => key === field.fieldKey)[0];
    }


    handleChange = (event) => {
        let field = event.currentTarget;
        let fieldsResponse = this.state.fieldsResponse;
        const typeField = this.getField(field.id);

        if(typeField && typeField.dataType === 'checkbox'){
            if(fieldsResponse[field.id]){
                fieldsResponse[field.id][field.innerText] = !fieldsResponse[field.id][field.innerText];
            } else {
                fieldsResponse[field.id] = {};
                fieldsResponse[field.id][field.innerText] = true;
            }
        } else {
            fieldsResponse[field.id] = field.value ? field.value : field.innerText;
        }

        this.setState({
            fieldsResponse: fieldsResponse,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.apiService.sendData(this.state.fieldsResponse).then((res) => {
            console.log(res)
        });        
    }

    render() { 
        return (
            <div>
                <section>
                    <div>
                        <div>
                            <h2>Formulario</h2>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            { this.createSections() }
                            <div>
                                <input type="submit" value="submit"/>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
            
        );
    }
}

export default Form;