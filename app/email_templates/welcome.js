/* <img src="../../static/icons/import.png" /> */

const createWelcomeMail = customVariables => {
  console.log(customVariables);
  return `<div style="padding: 40px 0 30px 0; margin-left: 150px; margin-right: 150px;">
	          <span>Province of BC Logo?</span>
            <span style= "float: right">CleanBC Logo?</span>
          </div>
          <table align="center" border="1" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td/>
              <td bgcolor="#ffffff" style="padding: 40px 0 30px 0;" align="center">
                <h3>Hello, ${customVariables.firstName} ${customVariables.lastName}.</h3>
                <br/>
                <h4>Thank you for registering for the CleanBC Industrial Incentive Program.</h4>
                <br/>
                <p>Email stuff</p>
                <p>Email stuff</p>
                <p>Email stuff</p>
                <p>Email stuff</p>
                <p>Email stuff</p>
                <p>Email stuff</p>
                <p>Email stuff</p>
              </td>
              <td/>
            </tr>
            <tr>
              <td/>
              <td bgcolor="#ffffff" style="padding: 40px 0 30px 0;" align="center">
                <p>Bears are cool.</p>
                <p>Do you like bears?</p>
                <p>If you like bears click here:
                <a href='https://tenor.com/search/dancing-polar-bear-meme-gifs'>BEARS!</a></p>
              </td>
              <td/>
            </tr>
          </table>`;
};

module.exports = createWelcomeMail;
