package com.peop.backend.repository;

import com.peop.backend.model.PaymentSheduled;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Praneethpj
 */
@Repository
public interface PaymentRepository extends JpaRepository<PaymentSheduled,Long> {
    @Query("SELECT e from PaymentSheduled e where e.professionId =:professionId AND e.status=0")
    List<PaymentSheduled> findByProfessionId(Long professionId);

    @Query("SELECT e from PaymentSheduled e where e.professionId =:professionId")
    List<PaymentSheduled> findByProfessionIdAll(Long professionId);

    List<PaymentSheduled> findByUserId(Long userid);

    Boolean existsByIdAndProfessionId(Long id,Long professtionId);
}
