import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import {Picker} from 'emoji-mart';
import $ from 'jquery';

export const EmojiPicker=(props)=>{
	return(
				<React.Fragment>
					<Picker
						onSelect={(e)=>console.log($(props.targetId).val($(props.targetId).val()+e.native))}
					/>
				</React.Fragment>
		);
}