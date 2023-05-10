import axios from 'axios';

//id: number
export const getApplicantDetails = async ({id}) => {
    try {
        const applicationResponse = await axios.get(`http://localhost:55731/api/Application/getApplication?Id=${id}`);
        const applicationData = applicationResponse.data;
       const { PersonalInformationId, AttachmentId, JobId } = applicationData;

        const personalInformationResponse = await axios.get(`http://localhost:55731/api/PersonalInformation/getPersonalInformation?Id=${PersonalInformationId}`);
        const personalInformationData = personalInformationResponse.data;
      
        const jobResponse = await axios.get(`http://localhost:55731/api/Job/getJob?Id=${JobId}`);
        const jobData = jobResponse.data;

        const attachmentResponse = await axios.get(`http://localhost:55731/api/Attachment/getAttachment?Id=${AttachmentId}`);
        const attachmentData = attachmentResponse.data;
        
        console.log("Application Data", applicationData);
        console.log("Personal Information Data", personalInformationData);
        console.log("Attachment Data", attachmentData);

        return {
        ...applicationData,
        personalInformation: personalInformationData,
        attachment: attachmentData,
        job: jobData,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
  };
  