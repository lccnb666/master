package com.yeqifu.bus.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import com.yeqifu.bus.entity.JcCoreSample;
import com.yeqifu.bus.service.IJcCoreSampleService;
import com.yeqifu.bus.vo.LytzVo;
import com.yeqifu.sys.common.DataGridView;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author jobob
 * @since 2020-06-08
 */
@RestController
@RequestMapping("/lytz")
public class JcCoreSampleController {

    @Autowired
    private IJcCoreSampleService jcCoreSampleService;
    /**
     * 查询所有
     * @param lytzVo
     * @return
     */
    @RequestMapping("loadAll")
    public DataGridView loadAll(LytzVo lytzVo){
        //1.声明一个分页page对象
        IPage<JcCoreSample> page = new Page(lytzVo.getPage(),lytzVo.getLimit());
        //2.声明一个queryWrapper
        QueryWrapper<JcCoreSample> queryWrapper = new QueryWrapper();
        queryWrapper.like(StringUtils.equals(lytzVo.getCombo(),"gc_code")&&StringUtils.isNotBlank(lytzVo.getNum()),"gc_code",lytzVo.getNum());
        queryWrapper.like(StringUtils.equals(lytzVo.getCombo(),"wt_num")&&StringUtils.isNotBlank(lytzVo.getNum()),"wt_num",lytzVo.getNum());
        //对时间进行查询要求大于开始时间小于结束时间
        queryWrapper.ge(lytzVo.getStartTime()!=null,"wt_date",lytzVo.getStartTime());
        queryWrapper.le(lytzVo.getEndTime()!=null,"wt_date",lytzVo.getEndTime());
        jcCoreSampleService.page(page,queryWrapper);
        return new DataGridView(page.getTotal(),page.getRecords());
    }

}
