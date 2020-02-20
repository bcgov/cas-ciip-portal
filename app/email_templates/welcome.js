/* <img src="../../static/icons/import.png" /> */

const createWelcomeMail = customVariables => {
  console.log(customVariables);
  return `<table align="center" border="1" cellpadding="0" cellspacing="0" width="600">
            <tr>
              <td bgcolor="#ffffff" style="padding: 40px 0 30px 0;" align="center">
                <span style= "float: left">Province of BC Logo?</span>
                <span style= "float: right">CleanBC Logo?</span>
                <br/>
                <br/>
                <h3>Hello, ${customVariables.firstName} ${customVariables.lastName}.</h3>
                <br/>
                <h4>Thank you for registering for the CleanBC Industrial Incentive Program.</h4>
                <br/>
                <p>Email stuff</p>
                <p>Email stuff</p>
                <p>Email stuff</p>
                <p>Email stuff</p>
                <br/>
                <p>Sent to : ${customVariables.email}.</p>
                <p>Not you? Well that's just hard cheese my friend.</p>
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffff" style="padding: 40px 0 30px 0;" align="center">
                <p>Bears are cool.</p>
                <p>Do you like bears?</p>
                <p>If you like bears click here:
                <a href='https://tenor.com/search/dancing-polar-bear-meme-gifs'>BEARS!</a></p>
              </td>
            </tr>
          </table>`;
};

module.exports = createWelcomeMail;
