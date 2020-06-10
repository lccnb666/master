package com.yeqifu.bus.entity;

import java.util.Date;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
 
/**
 * @author lcc
 * @since 2020-06-09 16:33:15
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
public class JcCoreSample extends Model {
    private static final long serialVersionUID = 251392317747840350L;

    @TableField("wt_num")
    private String wtNum;

    @TableField("wt_date")
    private Date wtDate;

    @TableField("wt_unit")
    private String wtUnit;

    @TableField("yp_name")
    private String ypName;

    @TableField("sy_num")
    private String syNum;

    @TableField("gc_code")
    private String gcCode;

    @TableField("data_ip")
    private String dataIp;
}