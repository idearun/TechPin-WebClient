import React, {PropTypes} from 'react';

import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import FileCloud from 'material-ui/svg-icons/file/cloud';

const styles = {
    svgIcon: {
        width: '20px', 
        color:'#0D47A1'
    },
}

const ContactInfo = ({contactData}) => {
  return (
      <div className="">
        <div className='contact-info-row'>
          <FileCloud style={styles.svgIcon} />
          <span className="contact-info-title">
            <a href={contactData.website || ''} target='_blank'>{contactData.website || ''}</a>
          </span>
        </div>
        <div className='contact-info-row'>
          <FileCloud style={styles.svgIcon}  />
          <span className="contact-info-title">
            <a href={contactData.extraUrl || ''} 
              target='_blank'
              className={!contactData.extraUrl && 'link-disabled'}>
                {contactData.extraUrl || 'No extra url'}
            </a>
          </span>
        </div>
        <div className='contact-info-row'>
          <CommunicationEmail style={styles.svgIcon} />  
          <span className="contact-info-title">{contactData.email || 'No email'}</span>
        </div>
      </div>
    );
}


export default ContactInfo