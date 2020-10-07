import React, { Component } from 'react';
import Sidebar from '@bit/guya-ltd.gcss.molecules.sidebar';
import PanelTemplate from '@bit/guya-ltd.gcss.templates.home.panel';

export default class Home extends Component {
    render() {
        /* Props */
        const {children} = this.props;
        return (
            <PanelTemplate 
                sidebar={ 
                    <Sidebar 
                        theme='royal-blue'
                        menu={
                            {
                                primary: {
                                    logo: <p>sdfd</p>,
                                    top: <p>top</p>,
                                    bottom: <p>assadf</p>
                                },
                                secondary: <div class='box'></div>
                            }
                        }
                    />
                }
                header={ <div class='box' /> }
                footer={ <div class='box' /> } >
                {children}
        </PanelTemplate>
        )
    }
}