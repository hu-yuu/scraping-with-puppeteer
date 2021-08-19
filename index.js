const puppeteer = require('puppeteer')

const main = async () => {
  const browser = await puppeteer.launch({
    //headless: false, //for debugging
  });
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0)
  await page.goto('https://info.uniswap.org/#/tokens')

  //to find selector of element 
  //on browser right click on element > inspect > copy > copy selector
  
  let tokensMain = []
  
  for (let pageN = 0; pageN < 5; pageN++) {
    
    await page.waitForSelector('#root > div > div.sc-dliRfk.gGWpxW > div.sc-fYiAbW.kMAyus > div > div.sc-jKJlTe.sc-gipzik.sc-hzDkRC.sc-gojNiO.hXGBzQ > div > div.sc-bAeIUo.hhNxNf > div:nth-child(3) > div')
    var tokensOuter = await page.evaluate(
      () => {
        let tokenWEB = document.getElementsByClassName("sc-bXGyLb fJhFar")

        let tokens = []

        for (let el = 0; el < tokenWEB.length; el++) {


          let tokenDOM = tokenWEB[el]

          let tokenName = tokenDOM.children[0].children[1].children[2].children[0].textContent
          let price = tokenDOM.children[0].children[2].textContent
          let vol24H = tokenDOM.children[0].children[4].textContent
          let token = {
            "tokenName": tokenName,
            "price": price,
            "vol24H": vol24H
          }
          tokens.push(token)

        }

        return tokens

      }
    )
    tokensMain = tokensMain.concat(tokensOuter)
    await page.click('#root > div > div.sc-dliRfk.gGWpxW > div.sc-fYiAbW.kMAyus > div > div.sc-jKJlTe.sc-gipzik.sc-hzDkRC.sc-gojNiO.hXGBzQ > div > div.sc-bAeIUo.hhNxNf > div:nth-child(3) > div')
  
  }

  
  console.log(tokensMain, tokensMain.length)
  //output: 
  //tokens and 50

}


main()