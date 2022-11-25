function mkdir(dir,cb) {
    let paths = dir.split('/');
    let index  =1;
    function next(index) {
        //递归结束判断
        if(index>paths.length)return cb();
        let newPath = paths.slice(0,index).join('/');
        access(newPath,function (err) {
            if(err){//如果文件不存在，就创建这个文件
                mkdir(newPath,function (err) {
                    next(index+1);
                });
            }else{
                //如果这个文件已经存在，就进入下一个循环
                next(index+1);
            }
        })
    }
    next(index);
}
