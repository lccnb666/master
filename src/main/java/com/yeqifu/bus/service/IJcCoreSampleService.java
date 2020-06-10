package com.yeqifu.bus.service;

import com.yeqifu.bus.entity.JcCoreSample;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author jobob
 * @since 2020-06-08
 */
public interface IJcCoreSampleService extends IService<JcCoreSample> {
    /**
     * 根据客户id删除客户
     * @param id    客户id
     */
    void deleteCustomerById(Integer id);
}
