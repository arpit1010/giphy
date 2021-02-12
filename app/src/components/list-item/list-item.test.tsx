import React from 'react';
import { render, screen } from '@testing-library/react';
import ListItem from './list-item'
import userEvent from '@testing-library/user-event';

describe('<ListItem> renders with props and callback', ()=>{
    const props = {
        gif:{
            id:'2233444',
            images: {
                fixed_height_small_still :{
                    url: "",
                    slug:"random",
                    height:100
                },
                original:{
                    url: "",
                    slug:"",
                    height:200
                }
            }
        }
        
    }
    
    //this component uses custom hook useModal so it will fail as there is no unit testing support for cutom hooks
    test('renders gif', ()=>{  
        render(<ListItem {...props}/>);
        const image = screen.queryByAltText(/random/i);
        expect(image).toBeInTheDocument();
    });
    test('modal opens on click', ()=>{
        render(<ListItem {...props}/>);
        userEvent.click(screen.getByAltText(/random/i));
        expect(screen.getAllByAltText(/random/i)).toBeGreaterThanOrEqual(2);
    })
})