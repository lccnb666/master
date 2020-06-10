package com.yeqifu.bus.service.impl;

import com.yeqifu.bus.entity.JcCoreSample;
import com.yeqifu.bus.mapper.JcCoreSampleMapper;
import com.yeqifu.bus.service.IJcCoreSampleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author jobob
 * @since 2020-06-08
 */
@Service
public class JcCoreSampleServiceImpl extends ServiceImpl<JcCoreSampleMapper, JcCoreSample> implements IJcCoreSampleService {


    @Autowired
    private JcCoreSampleMapper jcCoreSampleMapper;
    @Override
    public void deleteCustomerById(Integer id) {

    }
}
