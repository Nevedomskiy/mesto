module.export = {
   presets: [
      [
         '@babel/preset-env', {
            targets: {
               ie: '11',
               chrome: '64',
            },
            useBuildIns: "entry",
            corejs: "3.29"
         }
      ]
   ]
}
